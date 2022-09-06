import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAppointmentComponent } from './select-appointment.component';

describe('SelectAppointmentComponent', () => {
  let component: SelectAppointmentComponent;
  let fixture: ComponentFixture<SelectAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
