import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/interfaces/service.interface';
import Swal from 'sweetalert2';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  _id = "";
  editProductForm!: FormGroup;
  public errorEditProduct = "";

  constructor(private fb: FormBuilder,private  productService: ProductService) {

    this.editProductForm = this.fb.group({
      nombre: ['',[Validators.required]],
      costo: [0,Validators.required],
      precio: [0,Validators.required],
      stock: [0,Validators.required],
      descripcion: [''],
    });


   }

  ngOnInit(): void {
    this.productService.getProduct(this._id).subscribe((x) => {
      this._id = x._id;
       this.editProductForm.setValue({nombre: x.nombre,costo: x.costo, precio:  x.precio,
        stock: x.stock, descripcion: x.descripcion})
    })

  }


  @Output() closeEditProductModal = new EventEmitter();


  editProduct(){
    if(this.editProductForm.valid){
      const data = this.editProductForm.getRawValue(); 

      this.productService.editProduct(data,this._id).subscribe((x)=> {
        this.errorEditProduct = '';
        Swal.fire({
          title: 'Success!',
          text:  "Se actualizo correctamente el usuario",
          icon: 'success',
          confirmButtonText: 'OK'
        })

        this.editProductForm.reset()
        this.closeEditModalF();
      },(e) => {
        this.errorEditProduct = e.error.error;
        Swal.fire({
          title: 'Error!',
          text:  this.errorEditProduct,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
    }
  }



  closeEditModalF(){
    this.closeEditProductModal.emit('CLOSE_EDIT_PRODUCT_MODAL');
  }

}
