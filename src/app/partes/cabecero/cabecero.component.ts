import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
})
export class CabeceroComponent implements OnInit {
  sesionac: boolean;
  nusuario: string;
  tpusuario: string ;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.auth.getAuth().subscribe((auth) => {
      if (auth) {
        this.sesionac = true;
        this.auth.getDatosUsuario(auth.uid).subscribe((data) => {
          localStorage.setItem('usuario',data.payload.data()['Nombre']);
          localStorage.setItem('tipoUser',data.payload.data()['TipoUsuario'])
          this.nusuario = localStorage.getItem('usuario') || '';
          this.tpusuario = localStorage.getItem('tipoUser')||'';
        });
      } else {
        this.sesionac = false;
      }
    });
  }
  

  logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('tipoUser');
    this.sesionac=false;
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  
}
