import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/service.interface';


@Injectable({
  providedIn: 'root'
})


export class ProductService {

  defaultBack = 'http://localhost:3001/api/product/';
  headers = { 
    'Content-Type': 'application/json'
  }


  constructor(private http: HttpClient) { }

  
  

  getProducts(){
    return this.http.get(this.defaultBack+'products',{headers: this.headers})
  }

  getProduct(id: string): Observable<any>{
    return this.http.get(this.defaultBack+'product/'+id,{headers: this.headers})
  }


  addProduct(data: any){
    return this.http.post(this.defaultBack + 'add-product', JSON.stringify(data),{headers: this.headers})
  }

  editProduct(data: Service,id: string){
    return this.http.put(this.defaultBack+'product/'+ id, JSON.stringify(data),{headers: this.headers})
  }

  deleteProduct(id: string): Observable<any>{
    return this.http.delete(this.defaultBack+'product/'+id,{headers: this.headers})
  }

}
