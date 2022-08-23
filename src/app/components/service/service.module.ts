import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services/services.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

//angular material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'  
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent
  },
  {
    path: 'add-service',
    component:AddServiceComponent
  },
  {
    path: 'edit-service',
    component: EditServiceComponent
  
  }
]


@NgModule({
  declarations: [
    ServicesComponent,
    AddServiceComponent,
    EditServiceComponent
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
  ]
})
export class ServiceModule { }
