import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})


export class ServiceService {

  defaultBack = 'https://backend-node-js-angular-barber-shop.vercel.app/api/service/';
  headers = { 
    'Content-Type': 'application/json'
  }

  constructor(private http: HttpClient) { }
  

  getServices(){
    return this.http.get(this.defaultBack+'services',{headers: this.headers})
  }

  getService(id: string): Observable<any>{
    return this.http.get(this.defaultBack+'service/'+id,{headers: this.headers})
  }

  addService(data: Service){
    return this.http.post(this.defaultBack+'add-service', JSON.stringify(data),{headers: this.headers})
  }

  editService(data: Service,id: string){
    return this.http.put(this.defaultBack+'service/'+ id, JSON.stringify(data),{headers: this.headers})
  }

  deleteService(id: string): Observable<any>{
    return this.http.delete(this.defaultBack+'service/'+id,{headers: this.headers})
  }

}
