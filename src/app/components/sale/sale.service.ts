import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  defaultBack = 'https://backend-node-js-angular-barber-shop.vercel.app/api/sale/';
  headers = { 
    'Content-Type': 'application/json'
  }

  constructor(private http: HttpClient) { }

  getSales(){
    return this.http.get(this.defaultBack+'sales',{headers: this.headers})
  }

  getSale(id: string): Observable<any>{
    return this.http.get(this.defaultBack+'sale/'+id,{headers: this.headers})
  }

  addSale(data: any){
    return this.http.post(this.defaultBack+'add-sale', JSON.stringify(data),{headers: this.headers})
  }

  editSale(data: any,id: string){
    return this.http.put(this.defaultBack+'edit-sale/'+ id, JSON.stringify(data),{headers: this.headers})
  }

  deleteSale(id: string): Observable<any>{
    return this.http.delete(this.defaultBack+'sale/'+id,{headers: this.headers})
  }
}
