import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  
  // tpusuario: string ;
  constructor(
    // private auth: AuthService,
    private router: Router,
    private Auth: AngularFireAuth
  ) {}

  canActivate(): Observable<boolean> {
    return this.Auth.authState.pipe(
      map((auth) => {
        // this.tpuser();
        if (auth &&  localStorage.getItem('tipoUser') === 'Administrador') {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }

  // tpuser() {
  //   this.auth.getAuth().subscribe((auth) => {
  //     if (auth) {
  //       this.auth.getDatosUsuario(auth.uid).subscribe((data) => {
  //         this.tpusuario = data.payload.data()['TipoUsuario'];
  //       });
  //     }
  //   });
  // } 
}
