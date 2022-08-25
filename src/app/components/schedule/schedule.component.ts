import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  public weekDays: string[] = [];
  idSchedule = "";
  
  generalForm!: FormGroup;

  constructor(private fb: FormBuilder, private scheduleService: ScheduleService) { 
    

    this.generalForm = this.fb.group({
        lunes: this.getFbGroup(),
        martes: this.getFbGroup(),
        miercoles: this.getFbGroup(),
        jueves: this.getFbGroup(),
        viernes:  this.getFbGroup(),
        sabado:  this.getFbGroup(),
        domingo:   this.getFbGroup(),
    });

    this.weekDays= Object.keys(this.generalForm.controls).map(key => key );

    this.getSchedule();
    
  }

  ngOnInit(): void {
  }

  getSchedule(){
    this.scheduleService.getSchedule().subscribe((x) => {
      if(x){
        this.idSchedule = x._id;
        for(let day of this.weekDays){
          this.generalForm.get(day)?.setValue({
            inicioHorario: x[day].inicioHorario,
            finHorario:  x[day].finHorario,
            comienzoDeDescanso:  x[day].comienzoDeDescanso,
            horasDescanso:  x[day].horasDescanso,
            citasDisponiblesPorHorario:   x[day].citasDisponiblesPorHorario,
          })
        
        }

        
        
      }
    })
  }


  getFbGroup(iH = '',fH ='',cD = '',hD = '',cDPH = ''){
    return this.fb.group({
      inicioHorario: [iH,[Validators.required]],
      finHorario: [fH,Validators.required],
      comienzoDeDescanso: [cD,Validators.required],
      horasDescanso: [hD,Validators.required],
      citasDisponiblesPorHorario:  [cDPH,Validators.required],
    });
  }

  getMyGroup(day: string) {
    return this.generalForm.get(day) as FormGroup;
  }

  saveSchedule(){
    let formObj = this.generalForm.getRawValue(); 
    if(this.idSchedule != ""){
      this.scheduleService.editSchedule(formObj,this.idSchedule).subscribe((x) => {
        this.idSchedule = x._id;
        this.getSchedule();
        Swal.fire({
          title: 'Success!',
          text:  "Se guardo correctamente el horario",
          icon: 'success',
          confirmButtonText: 'OK'
        })
      })
    }else{
      this.scheduleService.addSchedule(formObj).subscribe((x) => {
        console.log(x);
      })
    }
    
  }



}
