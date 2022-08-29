import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {UserService} from '../user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addUserForm!: FormGroup;
  public errorAddUser = "";
   roles: string[] = [];
   permisos: string[] = [];
  @Output() closeAddUserModal = new EventEmitter();
  @ViewChild('imgAvatar') imgAvatar! : ElementRef<HTMLImageElement>;
  randomAvatar = Math.random();
  urlAvatar = "https://avatars.dicebear.com/api/adventurer/"+this.randomAvatar+".svg";

  constructor(private fb: FormBuilder,private  userService: UserService,private _snackBar: MatSnackBar){

    this.addUserForm = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',Validators.required],
      password: ['',Validators.required],
      avatar: [this.urlAvatar,Validators.required],
      role: [null,Validators.required],
      permissions: [null,Validators.required],
    });


    this.roles = this.userService.getRoles();
    this.permisos = this.userService.getPermissions();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
   this.imgAvatar.nativeElement.setAttribute('src',this.urlAvatar);
  }

  refreshAvatar(){
    this.randomAvatar = Math.random();
    this.urlAvatar = "https://avatars.dicebear.com/api/adventurer/"+this.randomAvatar+".svg";
    this.imgAvatar.nativeElement.setAttribute('src',this.urlAvatar);
    this.addUserForm.get('avatar')?.setValue(this.urlAvatar);
  }


  addUser(){
    if(this.addUserForm.valid){
      const data = this.addUserForm.getRawValue(); 
      this.userService.addUser(data).subscribe((x)=> {
        this.errorAddUser = '';
        Swal.fire({
          title: 'Success!',
          text:  "Se guardo correctamente el usuario",
          icon: 'success',
          confirmButtonText: 'OK'
        })

        this.addUserForm.reset()
        this.closeAddModalF();
      },(e) => {
        this.errorAddUser = e.error.error;
        Swal.fire({
          title: 'Error!',
          text:  this.errorAddUser,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
    }
  }

  closeAddModalF(){
    this.closeAddUserModal.emit('CLOSE_ADD_USER_MODAL');
  }

  


}
