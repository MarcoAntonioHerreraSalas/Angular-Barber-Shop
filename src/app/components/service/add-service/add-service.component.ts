import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ServiceService} from '../service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {

  addServiceForm!: FormGroup;
  public errorAddService = "";
  @Output() closeAddServiceModal = new EventEmitter();




  constructor(private fb: FormBuilder,private  serviceService: ServiceService,private _snackBar: MatSnackBar){

    this.addServiceForm = this.fb.group({
      nombre: ['',[Validators.required]],
      costo: [0,Validators.required],
      precio: [0,Validators.required],
      detalle: ['',Validators.required],
    });


  
  }

  ngOnInit(): void {
  }


  addService(){
    if(this.addServiceForm.valid){
      const data = {
        nombre: this.addServiceForm.get('nombre')?.value,
        costo: this.addServiceForm.get('costo')?.value,
        precio: this.addServiceForm.get('precio')?.value,
        detalle: this.addServiceForm.get('detalle')?.value,
      }
      this.serviceService.addService(data).subscribe((x)=> {
        this.errorAddService = '';
        Swal.fire({
          title: 'Success!',
          text:  "Se guardo correctamente el servicio",
          icon: 'success',
          confirmButtonText: 'OK'
        })

        this.addServiceForm.reset()
        this.closeAddModalF();
      },(e) => {
        this.errorAddService = e.error.error;
        Swal.fire({
          title: 'Error!',
          text:  this.errorAddService,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
    }
  }

  closeAddModalF(){
    this.closeAddServiceModal.emit('CLOSE_ADD_SERVICE_MODAL');
  }

  


}
