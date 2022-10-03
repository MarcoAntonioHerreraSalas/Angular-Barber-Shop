import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  defaultBack = 'http://marcosalasdeploys.alwaysdata.net/api/schedule/';
  headers = { 
    'Content-Type': 'application/json'
  }


  constructor(private http: HttpClient) { }


  getSchedule(): Observable<any>{
    return this.http.get(this.defaultBack+'schedule',{headers: this.headers})
  }

  addSchedule(data: any): Observable<any>{
    return this.http.post(this.defaultBack+'add-schedule', JSON.stringify(data),{headers: this.headers})
  }

  editSchedule(data: any,id: string): Observable<any>{
    return this.http.put(this.defaultBack+'schedule/'+id, JSON.stringify(data),{headers: this.headers})
  }
}
