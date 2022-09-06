import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { AppointmentService } from '../appointment.service';

export interface appoInterface {
  _id: string;
  title:string;
  nombre:string;
  numero: number;
  id_servicio: string;
  servicio: string;
  start: string;
  allDay:boolean;
  __v:number;
}


@Component({
  selector: 'app-select-appointment',
  templateUrl: './select-appointment.component.html',
  styleUrls: ['./select-appointment.component.scss']
})
export class SelectAppointmentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title','nombre' ,'numero','start','actions'];
  dataSource: appoInterface[] = [];
  @Output() SelectServiceModal = new EventEmitter();
  constructor(private appoService: AppointmentService, private serviceService : ServiceService) { }
  
  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(){
    this.appoService.getAppointments( new Date).subscribe((x: any) => {
      this.dataSource = x;
    })
  }

  selectAppointment(element: appoInterface){
    
    this.serviceService.getService(element.id_servicio).subscribe((x) => {
      this.SelectServiceModal.emit(x);
    })
  //  this.closeSelectServiceModalF();
  }

  closeSelectProductModalF(){
    this.SelectServiceModal.emit('CLOSE_SELECT_SERVICE_MODAL');
  }

}
