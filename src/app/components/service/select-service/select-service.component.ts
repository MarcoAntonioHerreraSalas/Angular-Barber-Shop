import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { elementAt } from 'rxjs';
import { ServiceService } from '../service.service';

export interface ServiceInterface {
  _id: string;
  nombre: string;
  costo: number;
  precio: number;
  detalle: string;
  _v: number;
}

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss']
})
export class SelectServiceComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'costo', 'precio', 'detalle','actions'];
  dataSource: ServiceInterface[] = [];
  selectedElement: any = null; 
  @Output() SelectServiceModal = new EventEmitter();
  
  constructor( private  serviceService: ServiceService) { }

  

  ngOnInit(): void {
    this.getServices();
  }

  getServices(){
    this.serviceService.getServices().subscribe((x: any) => {
      this.dataSource = x;
    })
  }


  selectService(element: ServiceInterface){
    this.selectedElement = element;
    this.SelectServiceModal.emit(element);
  //  this.closeSelectServiceModalF();
  }

  closeSelectServiceModalF(){
    this.SelectServiceModal.emit('CLOSE_SELECT_SERVICE_MODAL');
  }

}
