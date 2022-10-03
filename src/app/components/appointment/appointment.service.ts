import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  defaultBack = 'http://marcosalasdeploys.alwaysdata.net/api/appointment/';
  headers = { 
    'Content-Type': 'application/json'
  }

  constructor(private http: HttpClient) { }


  addAppointment(data: any){
    return this.http.post(this.defaultBack+'add-appointment',JSON.stringify(data),{headers: this.headers})
  }

  getAppointments(date: Date){
    const data = {date: date}
    return this.http.post(this.defaultBack+'appointments',JSON.stringify(data), {headers: this.headers})
  }

  deleteAppointment(id:string){
    return this.http.delete(this.defaultBack+'appointment/'+id,{headers:this.headers});
  }
}
