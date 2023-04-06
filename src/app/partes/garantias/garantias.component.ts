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
  safeurl:any;

  constructor(
    private fb: FormBuilder,
    private aroute: ActivatedRoute,
    private toastr: ToastrService,
    private firestore: FirestoreService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.formg = this.fb.group({
      numpoliza: ['', Validators.required],
      numserie: ['', Validators.required],
      claveprod: ['', Validators.required],
      tienda: ['', Validators.required],
      direccion: ['', Validators.required],
      fechaad: ['', Validators.required],
      fechaex: ['', Validators.required],
      tiempog: ['', Validators.required],
    });
    this.id = this.aroute.snapshot.paramMap.get('id');
    this.acc.accion = this.aroute.snapshot.paramMap.get('tipo');
    // console.log(this.id);
    // console.log(this.acc.accion);
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
          numpoliza: data.payload.data()['NumPoliza'],
          numserie: data.payload.data()['NumSerie'],
          claveprod: data.payload.data()['ClaveProducto'],
          tienda: data.payload.data()['Tienda'],
          direccion: data.payload.data()['Direccion'],
          fechaad: data.payload.data()['FechaCompra'],
          fechaex: data.payload.data()['FechaExpiracion'],
          tiempog: data.payload.data()['DuracionGarantia'],
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
      this.garant.NumPoliza = this.formg.value.numpoliza;
      this.garant.NumSerie = this.formg.value.numserie;
      this.garant.ClaveProducto = this.formg.value.claveprod;
      this.garant.Tienda = this.formg.value.tienda;
      this.garant.Direccion = this.formg.value.direccion;
      this.garant.FechaCompra = this.formg.value.fechaad;
      this.garant.FechaExpiracion = this.formg.value.fechaex;
      this.garant.DuracionGarantia = this.formg.value.tiempog;
      await this.firestore
        .documento(this.garant, 'garantias', this.id)
        .catch((error) => {
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
      this.router.navigate(['/consultar']);
    }
  }
}
