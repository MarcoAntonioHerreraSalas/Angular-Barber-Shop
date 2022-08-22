import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LoginService } from './login.service';
// import { HttpClientModule } from '@angular/common/http';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeatherModule.pick(allIcons),
    FormsModule,
    ReactiveFormsModule,
    // HttpClientModule
  ],
  providers: [
    // LoginService
  ]
})
export class LoginModule { }
