import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateemployee } from './updateemployee';

describe('Updateemployee', () => {
  let component: Updateemployee;
  let fixture: ComponentFixture<Updateemployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updateemployee],
    }).compileComponents();

    fixture = TestBed.createComponent(Updateemployee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
