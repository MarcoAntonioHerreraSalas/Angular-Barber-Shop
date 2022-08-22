import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token = "";
  constructor(private http: HttpClient) { }
  defaultBack = 'http://localhost:3001/api/';
  headers = { 
    'Content-Type': 'application/json'
  }
  

  login(email: string, password: string){
    const data = JSON.stringify({
      email,
      password
    })

    return this.http.post(this.defaultBack + 'auth/ingresar',data,{headers: this.headers});
  }

  setTokenService(token: string){
    this.token = token;
  }

  isAuthenticated(){
    if(this.token !== ""){
      return true;
    }else{
      return false;
    }

    
  }
}
