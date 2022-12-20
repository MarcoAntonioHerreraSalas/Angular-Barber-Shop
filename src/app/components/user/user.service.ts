import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/service.interface';


@Injectable({
  providedIn: 'root'
})


export class UserService {

  defaultBack = 'http://localhost:3001/api/user/';
  defaultServerBack= 'http://localhost:3001/api/';
  headers = { 
    'Content-Type': 'application/json'
  }

  public roles = ['Administrador','Ventas','Barber'];
  public permisos = [
    {text: 'Dashboard', value:'home'},
    {text: 'Citas', value:'appointments'},
    {text: 'Servicios', value:'services'},
    {text: 'Horario', value:'schedule'},
    {text: 'Usuarios', value:'users'},
    {text: 'Ventas', value:'sales'},
    {text: 'Productos', value:'products'}];

  constructor(private http: HttpClient) { }

  
  

  getUsers(){
    return this.http.get(this.defaultBack+'users',{headers: this.headers})
  }

  getUser(id: string): Observable<any>{
    return this.http.get(this.defaultBack+'user/'+id,{headers: this.headers})
  }

  getRoles(){
    return this.roles;
  }

  getPermissions(){
    return this.permisos;
  }

  addUser(data: any){
    return this.http.post(this.defaultServerBack + 'auth/register', JSON.stringify(data),{headers: this.headers})
  }

  editUser(data: Service,id: string){
    return this.http.put(this.defaultServerBack+'auth/edit-register/'+ id, JSON.stringify(data),{headers: this.headers})
  }

  deleteUser(id: string): Observable<any>{
    return this.http.delete(this.defaultBack+'user/'+id,{headers: this.headers})
  }

}
