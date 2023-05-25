import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { AngularFireStorage, GetDownloadURLPipe } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class FirestoreService {
  
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  documento(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string, field: string, compare: string) {
    const collection = this.firestore.collection<tipo>(path, (ref) =>
      ref.where(field, '==', compare)
    );
    return collection.valueChanges();
  }

  getCollectionEd<tipo>(path: string, field: string, compare: string,field2:string,compare2:string) {
    const collection = this.firestore.collection<tipo>(path, (ref) =>
      ref.where(field, '==', compare).where(field2,'==',compare2)
    );
    return collection.valueChanges();
  }

  getdatos(id: string,collection:string): Observable<any> {
    return this.firestore.collection(collection).doc(id).snapshotChanges();
  }

  borrarItem(id:string){
     return this.firestore.collection('inventario').doc(id).delete();
  }

  actualizarItem(id:string,data:any){
    return this.firestore.collection('inventario').doc(id).update(data);
  }

  update(id: string,collection:string ,data: any) {
    return this.firestore
      .collection(collection)
      .doc(id)
      .update(data);
  }

  agregarArchivo(id: string, archivo: any, nombre: string,path:string): Promise<string> {
    return new Promise((resolve) => {
      const ruta = path + nombre;
      const ref = this.storage.ref(ruta);
      const task = ref.put(archivo);
      task.snapshotChanges().pipe( finalize(() => {
            ref.getDownloadURL().subscribe((res) => {
              const downloadURL = res;
              console.log(res);
              console.log(downloadURL);
              resolve(downloadURL);
              return;
            });
          })
        )
        .subscribe(data=>console.log(data?.metadata.bucket));
    });
  }

  descargarArchivo(){
    const ref = this.storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/inventariotec-9a.appspot.com/o/Qrs%2F4Rk6BenhpRbBpjUC5mFf?alt=media&token=799f2edf-738a-4509-a09b-47f942f75b8e')
    
  }

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
