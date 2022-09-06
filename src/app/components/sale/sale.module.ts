import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales/sales.component';
import { RouterModule, Routes } from '@angular/router';
import { AddSaleComponent } from './add-sale/add-sale.component';



//angular material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'  
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FeatherModule } from 'angular-feather';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatGridListModule } from '@angular/material/grid-list';


const routes: Routes = [
  {
    path: '',
    component: SalesComponent
  },
  {
    path: 'add-sale',
    component: AddSaleComponent
  },
  {
    path: 'add-sale/:id',
    component: AddSaleComponent
  },


]


@NgModule({
  declarations: [
    SalesComponent,
    AddSaleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),


    //angular materials
    MatCardModule,
    MatTableModule,
    MatFormFieldModule, 
    MatCheckboxModule ,
    MatInputModule ,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FeatherModule,
    MatGridListModule
  ]
})
export class SaleModule { }
