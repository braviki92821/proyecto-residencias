import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { garantias } from 'src/app/modelos/modelos';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-garantias',
  templateUrl: './garantias.component.html',
  styleUrls: ['./garantias.component.css'],
})
export class GarantiasComponent implements OnInit {
  id: string | null;
  newFile = '';
  i = 0; //pend
  //botones
  buttreg: boolean = true;
  butted: boolean = false;
  //form
  formg: FormGroup;
  //interface
  garant: garantias = {
    NumPoliza: '',
    NumSerie: '',
    ClaveProducto: '',
    Tienda: '',
    Direccion: '',
    FechaCompra: '',
    FechaExpiracion: '',
    DuracionGarantia: '',
    Archivo: '',
  };

  inv: any = {
    garantia: '',
  };

  acc: any = {
    accion: '',
  };
  
  url:string;
  safeurl:SafeUrl;

  constructor(
    private fb: FormBuilder,
    private aroute: ActivatedRoute,
    private toastr: ToastrService,
    private firestore: FirestoreService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.formg = this.fb.group({
      NumPoliza: ['', Validators.required],
      NumSerie: ['', Validators.required],
      ClaveProducto: ['', Validators.required],
      Tienda: ['', Validators.required],
      Direccion: ['', Validators.required],
      FechaCompra: ['', Validators.required],
      FechaExpiracion: ['', Validators.required],
      DuracionGarantia: ['', Validators.required],
    });
    this.id = this.aroute.snapshot.paramMap.get('id');
    this.acc.accion = this.aroute.snapshot.paramMap.get('tipo');
  }

  ngOnInit(): void {
    this.rellenarFormulario();
  }

  rellenarFormulario() {
    if (this.id !== null) {
      this.firestore.getdatos(this.id, 'garantias').subscribe((data) => {
        this.url=data.payload.data()['Archivo'];
        this.safeurl=this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        this.formg.setValue({
          NumPoliza: data.payload.data()['NumPoliza'],
          NumSerie: data.payload.data()['NumSerie'],
          ClaveProducto: data.payload.data()['ClaveProducto'],
          Tienda: data.payload.data()['Tienda'],
          Direccion: data.payload.data()['Direccion'],
          FechaCompra: data.payload.data()['FechaCompra'],
          FechaExpiracion: data.payload.data()['FechaExpiracion'],
          DuracionGarantia: data.payload.data()['DuracionGarantia'],
        });
      });
    }
  }

  subir(event: any) {
    this.newFile = event.target.files[0];
    console.log(this.newFile);
  }

  async registrarGarantia() {
    if (this.formg.invalid) {
      this.toastr.warning('Llene los campos solicitados');
      return;
    }

    if (this.id !== null) {
      this.garant = this.formg.value
      this.garant.Archivo=''
      await this.firestore.documento(this.garant, 'garantias', this.id).catch((error) => {
          this.toastr.error(this.firestore.firebaseError(error.code));
          });
      const res = await this.firestore.agregarArchivo(
        this.id,
        this.newFile,
        this.id + '-Garantia',
        'pdfs/garantias/'
      );
      const archivo: any = {
        Archivo: res,
      };
      this.inv.garantia = 'registrada';
      this.firestore.update(this.id, 'garantias', archivo);
      this.firestore.actualizarItem(this.id, this.inv);
      this.toastr.success('Registrado Correctamente');
      this.router.navigate(['/menu-consultar']);
    }
  }
}
