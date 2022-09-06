import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../product.service';

export interface ProductInterface {
  _id: string;
  nombre: string;
  costo: number;
  precio: number;
  stock: number;
  descripcion: string;
  _v: number;
}

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre','costo' ,'precio','stock','descripcion','actions'];
  dataSource: ProductInterface[] = [];
  @Output() SelectProductModal = new EventEmitter();

  constructor(private dialog: MatDialog , private  productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe((x: any) => {
      this.dataSource = x;
    })
  }

  selectProduct(element: ProductInterface){
    this.SelectProductModal.emit(element);
  //  this.closeSelectServiceModalF();
  }

  closeSelectProductModalF(){
    this.SelectProductModal.emit('CLOSE_SELECT_PRODUCT_MODAL');
  }


}
