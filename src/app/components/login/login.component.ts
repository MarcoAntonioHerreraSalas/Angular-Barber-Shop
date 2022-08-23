import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('signUp') signUpButton!: ElementRef<HTMLInputElement>;
  @ViewChild('signIn') signInButton!: ElementRef<HTMLInputElement>;
  @ViewChild('container') container! : ElementRef<HTMLDivElement>;


  loginForm!: FormGroup;
  accessError = "";
  
  constructor(private fb: FormBuilder, private loginService: LoginService,
     private localStorageService: LocalStorageService ,  private router: Router) { 

    this.loginForm = this.fb.group({
      email: ['',[Validators.email,Validators.required]],
      password: ['',Validators.required],
    });

  }

  ngOnInit(): void {}

  changeSize(tipo: string) {
    if(tipo === 'add'){
      this.container.nativeElement.classList.add("right-panel-active")
    }else{
      this.container.nativeElement.classList.remove("right-panel-active")
    }
  }

  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.loginService.login(email,password).subscribe((x: any) => {
        if(x.access_token){
          this.localStorageService.set('token',x.access_token);
          this.loginService.setTokenService(x.access_token);
          const user = this.loginService.getUserByEmail(email).subscribe((z: any) => {

            this.loginService.setUser(z.user);
            this.localStorageService.set("user",JSON.stringify(z.user));
            this.router.navigateByUrl('/home');

          });
        
        }
      },(e) => {
        console.log(e);
        this.accessError = e.error.error;
      })
    }
  }

}
