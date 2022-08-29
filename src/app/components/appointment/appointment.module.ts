import { FullCalendarModule } from '@fullcalendar/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments/appointments.component';
import {  RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  {
    path:"",
    component: AppointmentsComponent
  },
]

@NgModule({
  declarations: [
    AppointmentsComponent
  ],
  imports: [
    FullCalendarModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule
  ]
})
export class AppointmentModule { }
