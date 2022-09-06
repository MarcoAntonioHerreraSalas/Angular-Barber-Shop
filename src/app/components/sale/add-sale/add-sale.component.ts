import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { SelectAppointmentComponent } from '../../appointment/select-appointment/select-appointment.component';
import { SelectProductComponent } from '../../product/select-product/select-product.component';
import { SelectServiceComponent } from '../../service/select-service/select-service.component';
import { SaleService } from '../sale.service';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.scss']
})
export class AddSaleComponent implements OnInit {
  displayedColumns: string[] = ['actions','id', 'nombre','detalle', 'cantidad', 'precio', 'total'];
  DataSource: any[] = [];
  idSale: string = "";
  saleDateCreated: any = null;

  columns: string[] = ['total','result'];
  totalTable: any[] = [];

  productSelected: any[] = [];
  serviceSelected: any[] =[];


  constructor(private dialog: MatDialog, private changeDetectorRef:ChangeDetectorRef , 
    private saleService: SaleService,private activatedRoute: ActivatedRoute){
      this.activatedRoute.paramMap.subscribe(paramMap => {
        const id =  paramMap.get('id');
        if(id != undefined){
          this.idSale = id;
          this.saleService.getSale(id).subscribe((x) => {
            
            this.DataSource = [...this.DataSource,...x.productos];
            this.DataSource = [...this.DataSource,...x.servicios];
            this.productSelected = x.productos;
            this.serviceSelected = x.servicios;
          })
        }
      });
   }

  ngOnInit(): void {
    
    // this.DataSource.push(finalDataService)

    // this.productSelected.push(finalDataProd);
    
  }


  openSelectServiceModal() {
    
    const dialogRef =  this.dialog.open(SelectServiceComponent,{
      height: '80%',
      width: '1000px',
    });

    dialogRef.componentInstance.SelectServiceModal.subscribe((z) => {
      if(z._id){
        const data = this.preparePureData(z._id,z.nombre,z.detalle,1,z.precio, z.precio * 1)
        const find = this.DataSource.findIndex((e) => e.id === data.id );
        if(find != -1){
          this.DataSource[find].cantidad = this.DataSource[find].cantidad +1;
          this.DataSource[find].total = this.DataSource[find].cantidad * this.DataSource[find].precio;
          // const serviceFind= this.serviceSelected.findIndex((e) => e.id === data.id );
          // this.serviceSelected[serviceFind] = this.DataSource.find((e) => e.id === data.id );
        }else{
          this.DataSource.push(data);
          this.serviceSelected.push(data);
        }
        this.DataSource = [...this.DataSource];
        // this.changeDetectorRef.detectChanges();
        // dialogRef.close();
      }

      if(z === 'CLOSE_SELECT_SERVICE_MODAL'){
        dialogRef.close();
      }
    })

  }

  openSelectAppointmentModal() {
    
    const dialogRef =  this.dialog.open(SelectAppointmentComponent,{
      height: '80%',
      width: '1000px',
    });

    dialogRef.componentInstance.SelectServiceModal.subscribe((z) => {
      if(z._id){
        const data = this.preparePureData(z._id,z.nombre,z.detalle,1,z.precio, z.precio * 1)
        const find = this.DataSource.findIndex((e) => e.id === data.id );
        if(find != -1){
          this.DataSource[find].cantidad = this.DataSource[find].cantidad +1;
          this.DataSource[find].total = this.DataSource[find].cantidad * this.DataSource[find].precio;
          // const serviceFind= this.serviceSelected.findIndex((e) => e.id === data.id );
          // this.serviceSelected[serviceFind] = this.DataSource.find((e) => e.id === data.id );
        }else{
          this.DataSource.push(data);
          this.serviceSelected.push(data);
        }
        this.DataSource = [...this.DataSource];
        // this.changeDetectorRef.detectChanges();
        // dialogRef.close();
      }

      if(z === 'CLOSE_SELECT_SERVICE_MODAL'){
        dialogRef.close();
      }
    })

  }

  openSelectProductModal() {
    
    const dialogRef =  this.dialog.open(SelectProductComponent,{
      height: '80%',
      width: '1000px',
    });

    dialogRef.componentInstance.SelectProductModal.subscribe((z) => {
      if(z._id){
        const data = this.preparePureData(z._id,z.nombre,z.descripcion,1,z.precio, z.precio * 1)
        const find = this.DataSource.findIndex((e) => e.id === data.id );
        if(find != -1){
          this.DataSource[find].cantidad = this.DataSource[find].cantidad +1;
          this.DataSource[find].total = this.DataSource[find].cantidad * this.DataSource[find].precio;
          // const prodFind= this.productSelected.findIndex((e) => e.id === data.id );
          // this.productSelected[prodFind] = this.DataSource.find((e) => e.id === data.id );
        }else{
          this.DataSource.push(data);
          this.productSelected.push(data);
        }
        this.DataSource = [...this.DataSource];
        // this.changeDetectorRef.detectChanges();
        // dialogRef.close();
      }

      if(z === 'CLOSE_SELECT_SERVICE_MODAL'){
        dialogRef.close();
      }
    })

  }

  removeElementSale(id:string){
    this.DataSource = [...this.arrayFilter(this.DataSource,id)];
    this.productSelected = [...this.arrayFilter(this.productSelected,id)];
    this.serviceSelected = [...this.arrayFilter(this.serviceSelected,id)];
  }

  arrayFilter(myArray: any, id:string){
    return  myArray.filter(function( obj:any ) {
      return obj.id !== id;
    });

  }

  saveSale(){
    

    if(this.idSale == ""){
      const data ={
        productos: this.productSelected,
        servicios: this.serviceSelected,
        total: this.getTotal()
      }
      this.saleService.addSale(data).subscribe((x:any) => {
        if(x){
          this.idSale = x._id;
          this.saleDateCreated = x.date_created;
          
          Swal.fire({
            icon: 'success',
            title: 'Excelente...',
            text: 'Se agregó correctamente la venta!',
          })
        }
      },(e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.error.error,
        })
    });
    }else{
      const data = {
        productos: this.productSelected,
        servicios: this.serviceSelected,
        total: this.getTotal(),
        date_created: this.saleDateCreated
      }

      this.saleService.editSale(data,this.idSale).subscribe((x:any) => {
        if(x){ 
          Swal.fire({
            icon: 'success',
            title: 'Excelente...',
            text: 'Se actualizó correctamente la venta!',
          })
        }
      },(e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.error.error,
        })
    });

    }

    
  }


  preparePureData(id:string,nombre:string,detalle:string,cantidad:number,precio:number,total:number){
    return {
      id: id,
      nombre: nombre,
      detalle: detalle,
      cantidad: cantidad,
      precio: precio,
      total: total

    };
  }
  
  getTotal(){
    return this.DataSource.reduce(function (previous, x) {
      return previous + x.total;
  }, 0);
  }
  

}
