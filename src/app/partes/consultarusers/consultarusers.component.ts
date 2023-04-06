import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { usuarios } from 'src/app/modelos/usuarios.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-consultarusers',
  templateUrl: './consultarusers.component.html',
})
export class ConsultarusersComponent implements OnInit {

  consultausers:usuarios[];

  constructor(private auth: AuthService,private toastr: ToastrService) { }

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

}
