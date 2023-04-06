import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  AccesoUsuario: FormGroup;
  carga:boolean=false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private firestore:FirestoreService
  ) {
    this.AccesoUsuario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.auth.getAuth().subscribe(auth=>{
      if(auth){
        this.router.navigate(['/dashboard']);
      }
    })
  }

  async Login() {
    this.carga=true;
    const res=await this.auth.login(this.AccesoUsuario.value.email,this.AccesoUsuario.value.password).catch((error)=>{
       this.toastr.error(this.firestore.firebaseError(error.code))
       this.carga=false;
    })
     if(res){
       this.carga=false;
       this.router.navigate(['/dashboard']);
       this.toastr.success('Acceso Correcto');
       this.AccesoUsuario.reset();
     }
  }
}
