import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root',
  })
export class fireErrors {

    constructor(){}

 firebaseError(code: String) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Este correo ya ha sido registrado';
      case 'auth/weak-password':
        return 'Contraseña es muy debil';
      case 'auth/invalid-email':
        return 'Correo invalido';
      case 'auth/user-not-found':
        return 'Correo no registrado';
      default:
        return 'desconocido';
    }
}

}