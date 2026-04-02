import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      // @ts-ignore
      const auth = setContext((operation, context) => {
        // ← args are (operation, context), not (context, operation)
        const token = localStorage.getItem('auth_token');

        if (!token) {
          return {};
        }

        return {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      });

      return {
        link: ApolloLink.from([
          auth,
          httpLink.create({
            uri: 'https://101462946-comp3133-assignment2-azya.vercel.app/graphql',
          }),
        ]),
        cache: new InMemoryCache(),
      };
    }),
  ],
};
