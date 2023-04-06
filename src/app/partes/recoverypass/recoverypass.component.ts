import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-recoverypass',
  templateUrl: './recoverypass.component.html',
  styleUrls: ['./recoverypass.component.css'],
})
export class RecoverypassComponent implements OnInit {
  recuperarpassword: FormGroup;
  carga:boolean=false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private firestore: FirestoreService
  ) {
    this.recuperarpassword = this.fb.group({
      email:['', Validators.required]
    });
  }

  ngOnInit(): void {}

  async recovery() {
    const email=this.recuperarpassword.value.email;
    this.carga=true;
    await this.auth.recoverypassword(email).then(()=>{
      this.toastr.info('Se ha enviado un correo para las instrucciones para resetar su contraseña')
      this.router.navigate(['/login']);
    }).catch((error)=>{
      this.carga=false;
      this.toastr.error(this.firestore.firebaseError(error.code))
    })
  }
}
