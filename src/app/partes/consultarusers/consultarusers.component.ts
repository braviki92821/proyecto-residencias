import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { usuario } from 'src/app/modelos/modelos';
import { usuarios } from 'src/app/modelos/usuarios.model';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-consultarusers',
  templateUrl: './consultarusers.component.html',
})
export class ConsultarusersComponent implements OnInit {

  registrarUsuario: FormGroup;
  consultausers:usuarios[];
  carga: boolean = false;

  user: usuario = {
    id:'',
    Matricula: '',
    Nombre: '',
    Email: '',
    TipoUsuario: '',
    Password: ''
  };

  constructor(private fb: FormBuilder,private auth: AuthService,private toastr: ToastrService, private firestore: FirestoreService) {
    this.registrarUsuario = this.fb.group({
      Nombre: ['', Validators.required],
      Email: ['', [Validators.required,Validators.email]],
      Matricula: ['', Validators.required],
      TipoUsuario: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    this.consultarUsuarios();
  }

  consultarUsuarios(){
    this.auth.getUsuarios<usuarios>('usuarios').subscribe((user) => {
    this.consultausers = user;
  })
  }

  modificarUsuario(id:string,matricula:any,nombre:any){
    if(String(matricula) ==='' || String(nombre) ==='') {
        this.toastr.warning('no deje los valores vacios');
        return;
      }
      this.auth.actualizarUsuario(id,{Matricula:String(matricula),Nombre:String(nombre)});
      this.toastr.success('Usuario modificado correctamente');
  }

  eliminarUsuario(id:string){
     this.auth.eliminarUsuario(id).catch(error=>{
      this.toastr.warning(error)
      return
     });
     this.toastr.success('Usuario Eliminado')
  }

  registrar() {
    this.user = this.registrarUsuario.value
    this.user.Password  = this.generarPassword()
    this.carga = true;
    if(this.registrarUsuario.invalid){
      this.toastr.error('No deje campos vacios');
      this.carga = false;
      return
    }
    this.auth.registrarUser(this.user.Email, this.user.Password).subscribe((datos:any)=>{
      let id = datos.localId
      this.user.id = id;
      this.firestore.documento(this.user,'usuarios',datos.localId);
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
