import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ProductService} from '../product.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-product-user',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm!: FormGroup;
  public errorAddProduct = "";
  @Output() closeAddProductModal = new EventEmitter();

  constructor(private fb: FormBuilder,private  productService: ProductService,private _snackBar: MatSnackBar){

    this.addProductForm = this.fb.group({
      nombre: ['',[Validators.required]],
      costo: [0,Validators.required],
      precio: [0,Validators.required],
      stock: [0,Validators.required],
      descripcion: [''],
    });

  }

  ngOnInit(): void {}



  addProduct(){
    if(this.addProductForm.valid){
      const data = this.addProductForm.getRawValue(); 
      this.productService.addProduct(data).subscribe((x)=> {
        this.errorAddProduct = '';
        Swal.fire({
          title: 'Success!',
          text:  "Se guardo correctamente el producto",
          icon: 'success',
          confirmButtonText: 'OK'
        })

        this.addProductForm.reset()
        this.closeAddModalF();
      },(e) => {
        this.errorAddProduct = e.error.error;
        Swal.fire({
          title: 'Error!',
          text:  this.errorAddProduct,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
    }
  }

  closeAddModalF(){
    this.closeAddProductModal.emit('CLOSE_ADD_PRODUCT_MODAL');
  }

  


}
