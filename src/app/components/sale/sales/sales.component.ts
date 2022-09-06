import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SaleService } from '../sale.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'total', 'date_created', 'date_updated','actions'];
  dataSource: any[] = [];

  constructor( private  saleService: SaleService) { }
  ngOnInit(): void {
    this.getSales();
  }

  getSales(){
    this.saleService.getSales().subscribe((x: any) => {
      this.dataSource = x;
    })
  }

  deleteSale(id: string){
    this.saleService.deleteSale(id).subscribe((x) => {
      if(x){
        Swal.fire({
          icon: 'success',
          title: 'Excelente...',
          text: 'Se eliminó correctamente la venta!',
        })
        
        this.getSales();
      }
    },(e) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.error.error,
      })
    }) 
  }
}
