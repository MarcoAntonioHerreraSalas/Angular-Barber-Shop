import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {AddProductComponent} from '../add-product/add-product.component';
import {EditProductComponent} from '../edit-product/edit-product.component'

import { ProductService } from '../product.service';

export interface Products {
  _id: string;
  nombre: string;
  costo: number;
  precio: number;
  stock: number;
  descripcion: string;
  _v: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre','costo' ,'precio','stock','descripcion','actions'];
  dataSource: Products[] = [];
  

  constructor(private dialog: MatDialog , private  productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe((x: any) => {
      this.dataSource = x;
    })
  }

  openAddProductModal() {
    
    const dialogRef =  this.dialog.open(AddProductComponent,{
      height: '80%',
      width: '600px',
    });

    dialogRef.componentInstance.closeAddProductModal.subscribe((z) => {
      if(z === 'CLOSE_ADD_PRODUCT_MODAL'){
        dialogRef.close();
        this.getProducts();
      }
    })

  }
  
  
  editProduct(id: string){
    const dialogRefEdit =  this.dialog.open(EditProductComponent,{
      height: '80%',
      width: '600px',
    });

    dialogRefEdit.componentInstance._id = id;

    dialogRefEdit.componentInstance.closeEditProductModal.subscribe((z) => {
      if(z === 'CLOSE_EDIT_PRODUCT_MODAL'){
        dialogRefEdit.close();
        this.getProducts();
      }
    })

  }

  deleteProduct(id: string){

    Swal.fire({
      title: 'Estas seguro de eliminar el producto?',
      showCancelButton: true,
      cancelButtonColor:'#1C92DE',
      confirmButtonColor:'#E22020',
      confirmButtonText: 'Eliminar',
      icon:'warning'
    }).then((result) => {
      if (result.isConfirmed) {

        this.productService.deleteProduct(id).subscribe((x) => {
          if(x.deletedCount == 1){
            Swal.fire({
              title: 'Success!',
              text:  "Se elimino correctamente el producto",
              icon: 'success',
              confirmButtonText: 'OK'
            })

            this.getProducts();
          }
        })
        
      } 
    })


    
  }



}

