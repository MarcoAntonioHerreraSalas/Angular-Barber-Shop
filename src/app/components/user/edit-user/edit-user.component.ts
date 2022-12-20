import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/interfaces/service.interface';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { Permission } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  _id = "";
  editUserForm!: FormGroup;
  public errorEditUser = "";
  randomAvatar = Math.random();
  roles: string[] = [];
  permisos: Permission[] = [];
  @ViewChild('imgAvatar') imgAvatar! : ElementRef<HTMLImageElement>;
  urlAvatar = "https://avatars.dicebear.com/api/adventurer/"+this.randomAvatar+".svg";

  constructor(private fb: FormBuilder,private  userService: UserService) {

    this.editUserForm = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',Validators.required],
      password: [''],
      avatar: ['',Validators.required],
      role: [null,Validators.required],
      permissions: [null,Validators.required],
    });


    this.roles = this.userService.getRoles();
    this.permisos = this.userService.getPermissions();
   }

  ngOnInit(): void {
    this.userService.getUser(this._id).subscribe((x) => {
      this.urlAvatar = x.avatar;
      this._id = x._id;
       this.editUserForm.setValue({name: x.name,email: x.email, password: '',
        avatar: x.avatar, role: x.role, permissions: x.permissions})

        this.imgAvatar.nativeElement.setAttribute('src',this.urlAvatar);
    })

  }


  @Output() closeEditUserModal = new EventEmitter();


  editUser(){
    if(this.editUserForm.valid){
      const data = this.editUserForm.getRawValue(); 

      this.userService.editUser(data,this._id).subscribe((x)=> {
        this.errorEditUser = '';
        Swal.fire({
          title: 'Success!',
          text:  "Se actualizo correctamente el usuario",
          icon: 'success',
          confirmButtonText: 'OK'
        })

        this.editUserForm.reset()
        this.closeEditModalF();
      },(e) => {
        this.errorEditUser = e.error.error;
        Swal.fire({
          title: 'Error!',
          text:  this.errorEditUser,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
    }
  }

  refreshAvatar(){
    this.randomAvatar = Math.random();
    this.urlAvatar = "https://avatars.dicebear.com/api/adventurer/"+this.randomAvatar+".svg";
    this.imgAvatar.nativeElement.setAttribute('src',this.urlAvatar);
    this.editUserForm.get('avatar')?.setValue(this.urlAvatar);
  }


  closeEditModalF(){
    this.closeEditUserModal.emit('CLOSE_EDIT_USER_MODAL');
  }

}
