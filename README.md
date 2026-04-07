# COMP3133 — Assignment 2  
### Full-Stack Web Application (Frontend + Backend + Docker)

This is the source code for **COMP3133 Assignment 2**.  

A live build of the frontend is available at:  
**https://101462946-comp3133-assignment2-hs2u.vercel.app/**

---

## Overview

This assignment demonstrates a modern full-stack application using:

### Backend
- **Node.js**
- **Express**
- **MongoDB**
- **GraphQL API design**

### Frontend
- **Angular**
- **TypeScript**
- **Apollo Client**

### Tooling
- **Docker & Docker Compose**
- **Vercel (Frontend Deployment)**

The application runs as two independent services (API + client), both orchestrated with Docker for consistent local development.

---

## Getting Started

### **Prerequisites**
You must have the following installed:

- **Docker**

---

# Running the Project Locally

Make sure Docker Desktop is running, then execute:

```bash
docker compose up --build
```

This will:

* Build the backend container
* Build the frontend container
* Start both services in one network

To stop:

```bash
docker compose down
```