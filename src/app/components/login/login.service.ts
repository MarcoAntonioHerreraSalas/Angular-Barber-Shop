import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token = "";
  user : User = {id: "",name: "", email: "",avatar: "",roles: [],permissions: [] };

  constructor(private http: HttpClient) { 
    const us =  localStorage.getItem("user");
    this.user = us?JSON.parse(us):{id: "",name: "", email: "",avatar: "",roles: [],permissions: [] };
    const tok = localStorage.getItem("token");
    this.token = tok?tok:"";
  }
  defaultBack = 'http://marcosalasdeploys.alwaysdata.net/api/';
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

  getUserByEmail(email:string){
    const data = JSON.stringify({
      email
    })

    return this.http.post(this.defaultBack + 'user/getUserbyEmail',data,{headers: this.headers});

  }


  
  getUser() : User{
    return this.user;
  }

  setUser(user: User){
    this.user = user;
  }

  isAuthenticated(){
    //const token = localStorage.getItem("token"); //||  (token != undefined && token?.length > 0)
    if(this.token.length  > 0 ){
      return true;
    }else{
      return false;
    }

    
  }
}
