import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { usuario } from 'src/app/modelos/modelos';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  registrarUsuario: FormGroup;
  carga: boolean = false;

  modelos: usuario = {
    id:'',
    Matricula: '',
    Nombre: '',
    Email: '',
    TipoUsuario: '',
    Password: '',
    Cargo: '',
  };

  constructor( private fb: FormBuilder, private auth: AuthService, private toastr: ToastrService, private firestore: FirestoreService) {
    this.registrarUsuario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      matricula: ['', Validators.required],
      cargo: ['', Validators.required],
      tpusuario: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  registrar() {
    this.modelos.Matricula = this.registrarUsuario.value.matricula;
    this.modelos.Nombre = this.registrarUsuario.value.nombre;
    this.modelos.Email = this.registrarUsuario.value.email;
    this.modelos.Password = this.generarPassword();
    this.modelos.Cargo = this.registrarUsuario.value.cargo;
    this.modelos.TipoUsuario = this.registrarUsuario.value.tpusuario;
    this.carga = true;
    if(this.registrarUsuario.invalid){
      this.toastr.error('No deje campos vacios');
      this.carga = false;
      return
    }
    this.auth.registrarUser(this.modelos.Email, this.modelos.Password).subscribe((datos:any)=>{
      let id=datos.localId
      this.modelos.id=id;
      this.firestore.documento(this.modelos,'usuarios',datos.localId);
    })
    this.carga = false;
    this.toastr.success('Registrado correctamente');
    this.registrarUsuario.reset();
  }

  generarPassword(): string {
    let result = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$%&/';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

}
