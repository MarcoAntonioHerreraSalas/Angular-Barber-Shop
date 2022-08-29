import { ChangeDetectorRef, Component,ElementRef,Input,OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventAddArg, FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import Swal from 'sweetalert2';
import { AppointmentService } from '../appointment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent; // the #calendar in the template
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];
  servicesData = [];

  constructor(private elRef: ElementRef, private changeDetectorRef:ChangeDetectorRef, 
    private appoService: AppointmentService,private _snackBar: MatSnackBar, private serviceService: ServiceService) { }

  ngOnInit(): void {
    const myDate = new Date();
    this.appoService.getAppointments(myDate).subscribe((x) => {
      if(x){
        this.calendarOptions.events = Object.assign([],x);
      }
    })


    this.serviceService.getServices().subscribe((x: any) => {
      if(x){
        this.servicesData = x;
      }
    })
  }



  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    eventMaxStack: 3,
    slotMinTime: "09:00:00",
    slotMaxTime: "23:00:00",
    allDaySlot: false,
    height: 650,
    locale: "es",
    businessHours: [ {
      daysOfWeek: [ 1, 2, 3, 4,5 ], 
      startTime: '9:00', // a start time (10am in this example)
      endTime: '18:00', // an end time (6pm in this example)
    },
    {
      daysOfWeek: [6], 
      startTime: '9:00', 
      endTime: '16:00', 
    },
    {
      daysOfWeek: [7], 
      startTime: '9:00', 
      endTime: '12:00', 
    }
    ],
    initialDate: Date.now(),
    themeSystem: 'bootstrap',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    plugins: this.calendarPlugins,
    weekends: this.calendarWeekends,
    dateClick: this.handleDateClick.bind(this), // bind is important!
    customButtons: {
      next: {click: this. nextCalendar.bind(this)},
      prev: {click: this.prevCalendar.bind(this)},
      today: { text: "Hoy",click: this.todayCalendar.bind(this)},
      month: {text: "Mes",click: this.otherCalendar.bind(this)},
      week: {text: "Semana",click: this.otherCalendar.bind(this)},
      day: {text: "Día",click: this.otherCalendar.bind(this)},
      
    },
    eventClick: this.handleDropEvent.bind(this), 
    events: this.calendarEvents
  };



  handleDateClick(arg:any) {
    var localLocale = moment(arg.dateStr);
    moment.locale('es');
    localLocale.locale(false);
  
    Swal.fire({
      title: '¿Deseas agregar una cita el: '+ localLocale.format('LL') + ' a las '+localLocale.format(' hh:mm A') + '?',
      text: "Las citas se guardara de acuerdo a disponibilidad!",
      showCancelButton: true,
      icon: 'question',
      confirmButtonText: 'Si',
      confirmButtonColor: '#28a745'
    }).then(async (result)  => {
      if (result.isConfirmed) {
        
        const servicio = this.servicesData.map((e: any) => '<option id_servicio="'+e._id+'" value= "'+e.nombre+'" >'+e.nombre+' </option>')

        const { value: formValues } = await Swal.fire({
          title: 'Selecciona los datos para agendar Cita',
          html:
            `<label for="nombre" class="swal2-label">Nombre</label>
            <input id="nombre" class="swal2-input" >
            <label for="numero" class="swal2-label">Teléfono</label>
            <input id="numero"   maxlength="10" minlength="10" class="swal2-input" >
            <label for="servicio" class="swal2-label">Servicio</label>
           
              <select class="swal2-input" id="servicio"> 
                <option value= "" >Seleccionar </option>
                `+servicio+`
              </select>
            `,
          focusConfirm: false,
          preConfirm: () => {

            
            const nombre = document.getElementById('nombre')  as HTMLInputElement | null;
            const numero = document.getElementById('numero') as HTMLInputElement | null;
            const servicio = document.getElementById('servicio') as HTMLSelectElement | null;


            if(nombre != null && numero != null && (servicio !=null && servicio.value !="" )){
              return [
                nombre.value,
                numero.value,
                servicio.value,
                servicio.options[servicio.selectedIndex].getAttribute('id_servicio')
              ]
            }else{
              Swal.showValidationMessage(`Por favor Llevar los datos correctamente`)
            }

            return false;
            
          }
        })

      
        if (formValues) {

          const data = {
            title: 'Servicio de: '+ formValues[0],
            nombre: formValues[0],
            numero: formValues[1],
            servicio: formValues[2],
            id_servicio:formValues[3],
            start: arg.date,
            allDay: arg.allDay
          }

          this.appoService.addAppointment(data).subscribe((x) => {
            if(x){
              this.calendarEvents.push(data);
              this.appoService.getAppointments(this.calendarComponent.getApi().getDate()).subscribe((x) => {
                if(x){
                  this.calendarOptions.events = Object.assign([],x);
                  this.changeDetectorRef.detectChanges();
                }
              })
            }

          },(e) =>{
            this._snackBar.open(e.error.error, "Error", {
              duration: 5000,
              horizontalPosition: "right",
              verticalPosition: "top",
              // direction: "rtl"
            });
          })

        } 
      } 
    })

 
  }
  
  handleDropEvent(arg:any){
    Swal.fire({
      title: 'Que te gustaría hacer?',
      icon: 'info',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Ver Detalle',
      denyButtonText: `Eliminar`,
    }).then((result) => {

      const detail = arg.event._def.extendedProps;

      if (result.isConfirmed) {
        Swal.fire({
          title: '<strong>Detalle De La Cita </strong>',
          icon: 'info',
          html:
            '<b>Nombre: </b>' +detail.nombre + '<br>'+
            '<b>Número: </b>' +detail.numero  + '<br>' +
            '<b>Servicio: </b>'+detail.servicio  + '<br>',
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText:
            'OK!',
          confirmButtonAriaLabel: 'Thumbs up, great!',
        })
      } else if (result.isDenied) {
        const now  = moment().format('DD.MM.YYYY HH:mm');
        const eventDelete = moment(arg.event.start).format('DD.MM.YYYY HH:mm');
        
        if(now <  eventDelete){
          this.appoService.deleteAppointment(detail._id).subscribe((x) => {
              if(x){
                Swal.fire('Se elimino correctamente la cita.', '', 'success')
                arg.event.remove();
              }
            })
          
        }else{
          Swal.fire('La cita no se puede eliminar porque ya fue atendida.', '', 'error')
        }

      }
    })
    
  }


  //to getAllEventData
  nextCalendar(arg: any){this.getEventsByDate(arg,'next');}
  prevCalendar(arg: any){this.getEventsByDate(arg,'prev');}
  todayCalendar(arg: any){this.getEventsByDate(arg,'today');}
  otherCalendar(arg: any){this.getEventsByDate(arg,'');}

  getEventsByDate(arg: any,tipo: string = ""){
    const calendarApi = this.calendarComponent.getApi();
    switch ( tipo ) {
      case 'next':
        calendarApi.next();
          break;
      case 'prev':
        calendarApi.prev();
          break;
      case 'today':
        calendarApi.today();
          break;
      default: 
          // 
          break;
    }

    this.appoService.getAppointments(calendarApi.getDate()).subscribe((x) => {
      console.log(x);
    })

  }

}
