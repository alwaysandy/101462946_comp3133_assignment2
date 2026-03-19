import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employeeslist } from './employeeslist';

describe('Employeeslist', () => {
  let component: Employeeslist;
  let fixture: ComponentFixture<Employeeslist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Employeeslist],
    }).compileComponents();

    fixture = TestBed.createComponent(Employeeslist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
