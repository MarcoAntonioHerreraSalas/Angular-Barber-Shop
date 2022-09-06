import { FullCalendarModule } from '@fullcalendar/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments/appointments.component';
import {  RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SelectAppointmentComponent } from './select-appointment/select-appointment.component';
import { FeatherModule } from 'angular-feather';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path:"",
    component: AppointmentsComponent
  },
  {
    path:"select-appointment",
    component: SelectAppointmentComponent
  },
]

@NgModule({
  declarations: [
    AppointmentsComponent,
    SelectAppointmentComponent
  ],
  imports: [
    FullCalendarModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    FeatherModule,
    MatTableModule,
    MatButtonModule,
  ]
})
export class AppointmentModule { }
