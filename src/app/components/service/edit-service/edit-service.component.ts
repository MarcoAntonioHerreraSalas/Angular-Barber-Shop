import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/interfaces/service.interface';
import Swal from 'sweetalert2';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {
  _id = "";
  editServiceForm!: FormGroup;
  public errorEditService = "";
  constructor(private fb: FormBuilder,private  serviceService: ServiceService) {

    this.editServiceForm = this.fb.group({
      nombre: ['',[Validators.required]],
      costo: [0,Validators.required],
      precio: [0,Validators.required],
      detalle: ['',Validators.required],
    });

   }

  ngOnInit(): void {

    this.serviceService.getService(this._id).subscribe((x) => {
      this.editServiceForm.setValue({nombre: x.nombre,costo: x.costo, precio: x.precio, detalle: x.detalle})
    })

  }

  @Output() closeEditServiceModal = new EventEmitter();


  editService(){
    if(this.editServiceForm.valid){
      const data = {
        nombre: this.editServiceForm.get('nombre')?.value,
        costo: this.editServiceForm.get('costo')?.value,
        precio: this.editServiceForm.get('precio')?.value,
        detalle: this.editServiceForm.get('detalle')?.value,
      }
      this.serviceService.editService(data,this._id).subscribe((x)=> {
        this.errorEditService = '';
        Swal.fire({
          title: 'Success!',
          text:  "Se actualizo correctamente el servicio",
          icon: 'success',
          confirmButtonText: 'OK'
        })

        this.editServiceForm.reset()
        this.closeEditModalF();
      },(e) => {
        this.errorEditService = e.error.error;
        Swal.fire({
          title: 'Error!',
          text:  this.errorEditService,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
    }
  }


  closeEditModalF(){
    this.closeEditServiceModal.emit('CLOSE_EDIT_SERVICE_MODAL');
  }

}
