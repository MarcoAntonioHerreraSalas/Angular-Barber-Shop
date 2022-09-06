import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

//angular material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'  
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { SelectProductComponent } from './select-product/select-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'add-product',
    component:AddProductComponent
  },
  {
    path: 'edit-product',
    component: EditProductComponent
  
  },
  {
    path: 'select-product',
    component: SelectProductComponent
  
  }
]


@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    SelectProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
   
    
    //angular materials
    MatFormFieldModule, 
    MatInputModule ,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule ,
    MatButtonModule,
    FormsModule,
    MatOptionModule,
    ReactiveFormsModule,
    FeatherModule,
    MatListModule,
  ]
})
export class ProductModule { }
