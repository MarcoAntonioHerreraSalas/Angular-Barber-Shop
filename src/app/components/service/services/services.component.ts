import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {AddServiceComponent} from '../add-service/add-service.component'
import {EditServiceComponent} from '../edit-service/edit-service.component'

import { ServiceService } from '../service.service';

export interface Services {
  _id: string;
  nombre: string;
  costo: number;
  precio: number;
  detalle: string;
  _v: number;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'costo', 'precio', 'detalle','actions'];
  dataSource: Services[] = [];
  

  constructor(private dialog: MatDialog , private  serviceService: ServiceService) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(){
    this.serviceService.getServices().subscribe((x: any) => {
      this.dataSource = x;
    })
  }

  openAddServiceModal() {
    
    const dialogRef =  this.dialog.open(AddServiceComponent,{
      height: '80%',
      width: '600px',
    });

    dialogRef.componentInstance.closeAddServiceModal.subscribe((z) => {
      if(z === 'CLOSE_ADD_SERVICE_MODAL'){
        dialogRef.close();
        this.getServices();
      }
    })

  }
  
  
  editService(id: string){
    const dialogRefEdit =  this.dialog.open(EditServiceComponent,{
      height: '80%',
      width: '600px',
    });

    dialogRefEdit.componentInstance._id = id;

    dialogRefEdit.componentInstance.closeEditServiceModal.subscribe((z) => {
      if(z === 'CLOSE_EDIT_SERVICE_MODAL'){
        dialogRefEdit.close();
        this.getServices();
      }
    })

  }

  deleteService(id: string){

    Swal.fire({
      title: 'Estas seguro de eliminar el Servicio?',
      showCancelButton: true,
      cancelButtonColor:'#1C92DE',
      confirmButtonColor:'#E22020',
      confirmButtonText: 'Eliminar',
      icon:'warning'
    }).then((result) => {
      if (result.isConfirmed) {

        this.serviceService.deleteService(id).subscribe((x) => {
          if(x.deletedCount == 1){
            Swal.fire({
              title: 'Success!',
              text:  "Se elimino correctamente el servicio",
              icon: 'success',
              confirmButtonText: 'OK'
            })

            this.getServices();
          }
        })
        
      } 
    })


    
  }


}

