import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { climas, computadoras, monitores, muebles, proyectores,} from 'src/app/modelos/modelos';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  titulo = 'Registrar';
  id: string | null;
  image = '';
  //selects
  selected: FormGroup;
  select: FormGroup;
  //forms
  FormM: FormGroup;
  FormC: FormGroup;
  FormCl: FormGroup;
  FormMon: FormGroup;
  FormProy: FormGroup;
  //visibilidad
  formsc: boolean = true;
  //visibilidad buttons
  butted: boolean = false;
  buttreg: boolean = true;
  //visibilidad combo

  compus: computadoras = {
    id: '',
    PlacaMadre: '',
    Procesador: '',
    DiscoDuro: '',
    Ram: '',
    SO: '',
    costo: '',
    estado: 'Activo',
    edificio: '',
    lugar_edificio: '',
    tipo: '',
    qr: false,
    foto: '',
    garantia: '',
  };
  mub: muebles = {
    id: '',
    nombre: '',
    marca: '',
    caracteristicas: '',
    estado: '',
    edificio: '',
    lugar_edificio: '',
    tipo: '',
    subtipo:'',
    qr: false,
    foto: '',
    costo: '',
    garantia: '',
  };
  mon: monitores = {
    id: '',
    nombre: '',
    marca: '',
    tipoentrada: '',
    hz: '',
    resolucion: '',
    estado: 'Activo',
    edificio: '',
    lugar_edificio: '',
    tipo: '',
    qr: false,
    foto: '',
    costo: '',
    garantia: 'sin subir',
  };
  proyc: proyectores = {
    id: '',
    modelo: '',
    marca: '',
    tipoentrada: '',
    estado: '',
    edificio: '',
    lugar_edificio: '',
    tipo: '',
    qr: false,
    foto: '',
    costo: '',
    garantia: 'sin subir',
  };
  clim: climas = {
    id: '',
    capacidadt: '',
    capacidade: '',
    modelo: '',
    consumo: '',
    alto_ancho: '',
    costo: '',
    estado: '',
    edificio: '',
    lugar_edificio: '',
    tipo: '',
    qr: false,
    foto: '',
    garantia: 'sin subir',
    nombre: '',
  };

  constructor( private fb: FormBuilder, private toastr: ToastrService, private firestore: FirestoreService, private aroute: ActivatedRoute) {
    this.select = this.fb.group({
      selecc: ['', Validators.required],
    });

    this.selected = this.fb.group({
      edificios: ['', Validators.required],
    });

    this.FormC = this.fb.group({
      PlacaMadre: ['', Validators.required],
      Procesador: ['', Validators.required],
      DiscoDuro: ['', Validators.required],
      Ram: ['', Validators.required],
      SO: ['', Validators.required],
      costo: ['', Validators.required],
      edificio: ['', Validators.required],
      lugar_edificio: ['', Validators.required],
    });

    this.FormM = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      caracteristicas: ['', Validators.required],
      costo: ['', Validators.required],
      edificio: ['', Validators.required],
      lugar_edificio: ['', Validators.required],
      subtipo:['',Validators.required]
    });

    this.FormMon = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      tipoentrada: ['', Validators.required],
      hz: ['', Validators.required],
      resolucion: ['', Validators.required],
      costo: ['', Validators.required],
      edificio: ['', Validators.required],
      lugar_edificio: ['', Validators.required],
    });

    this.FormCl = this.fb.group({
      nombre: ['', Validators.required],
      capacidadt: ['', Validators.required],
      capacidade: ['', Validators.required],
      modelo: ['', Validators.required],
      consumo: ['', Validators.required],
      alto_ancho: ['', Validators.required],
      costo: ['', Validators.required],
      edificio: ['', Validators.required],
      lugar_edificio: ['', Validators.required],
    });

    this.FormProy = this.fb.group({
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      tipoentrada: ['', Validators.required],
      costo: ['', Validators.required],
      edificio: ['', Validators.required],
      lugar_edificio: ['', Validators.required],
    });

    this.id = this.aroute.snapshot.paramMap.get('id');
    this.select.value.selecc = this.aroute.snapshot.paramMap.get('tipo');
  }

  ngOnInit(): void {
    this.editar();
    console.log();
  }

  editar() {
    if (this.id !== null) {
      this.titulo = 'Editar';
      this.formsc = false;
      this.butted = true;
      this.buttreg = false;
     this.rellenarform();
    } else if (this.id === null) {
      this.titulo = 'Registrar';
      this.butted = false;
      this.buttreg = true;
    }
  }

  rellenarform() {
    if (this.id !== null) {
      this.firestore.getdatos(this.id, 'inventario').subscribe((data) => {
        if (this.select.value.selecc === 'computadoras') {
          this.FormC.setValue({
            PlacaMadre: data.payload.data()['PlacaMadre'],
            Procesador: data.payload.data()['Procesador'],
            DiscoDuro: data.payload.data()['DiscoDuro'],
            Ram: data.payload.data()['Ram'],
            SO: data.payload.data()['SO'],
            costo: data.payload.data()['costo'],
            edificio: data.payload.data()['edificio'],
            lugar_edificio: data.payload.data()['lugar_edificio'],
          });
        } else if (this.select.value.selecc === 'inmobiliario') {
          this.FormM.setValue({
            nombre: data.payload.data()['nombre'],
            marca: data.payload.data()['marca'],
            caracteristicas: data.payload.data()['caracteristicas'],
            costo: data.payload.data()['costo'],
            edificio: data.payload.data()['edificio'],
            lugar_edificio: data.payload.data()['lugar_edificio'],
            subtipo: data.payload.data()['subtipo'],
          });
        } else if (this.select.value.selecc === 'monitores') {
          this.FormMon.setValue({
            nombre: data.payload.data()['nombre'],
            marca: data.payload.data()['marca'],
            tipoentrada: data.payload.data()['tipoentrada'],
            hz: data.payload.data()['hz'],
            resolucion: data.payload.data()['resolucion'],
            costo: data.payload.data()['costo'],
            edificio: data.payload.data()['edificio'],
            lugar_edificio: data.payload.data()['lugar_edificio'],
          });
        } else if (this.select.value.selecc === 'proyectores') {
          this.FormProy.setValue({
            modelo: data.payload.data()['modelo'],
            marca: data.payload.data()['marca'],
            tipoentrada: data.payload.data()['tipoentrada'],
            costo: data.payload.data()['costo'],
            edificio: data.payload.data()['edificio'],
            lugar_edificio: data.payload.data()['lugar_edificio'],
          });
        } if (this.select.value.selecc === 'climas') {
          this.FormCl.setValue({
            nombre: data.payload.data()['nombre'],
            capacidadt: data.payload.data()['capacidadt'],
            capacidade: data.payload.data()['capacidade'],
            modelo: data.payload.data()['modelo'],
            consumo: data.payload.data()['consumo'],
            alto_ancho: data.payload.data()['alto_ancho'],
            costo: data.payload.data()['costo'],
            edificio: data.payload.data()['edificio'],
            lugar_edificio: data.payload.data()['lugar_edificio'],
          })
        }
      });
    }
  }

  async RegistrarCompu() {
    if (this.FormC.invalid) {
      this.toastr.warning('Llene los campos solicitados');
      return;
    }
    this.compus = this.FormC.value
    this.compus.id = this.firestore.getId();
    this.compus.estado = 'Activo';
    this.compus.tipo = this.select.value.selecc;
    this.compus.qr = false;
    this.compus.foto = '';
    this.compus.garantia = 'sin subir' 
    await this.firestore
      .documento(this.compus, 'inventario', this.compus.id)
      .catch((error) => {
        this.toastr.error(this.firestore.firebaseError(error.code));
      });
    this.toastr.success('Registrado Correctamente');
    this.FormC.reset();

  }

   async RegistrarMuebles() {
    if (this.FormM.invalid) {
      this.toastr.warning('Llene los campos solicitados');
      return;
    }
    this.mub = this.FormM.value
    this.mub.id = this.firestore.getId();
    this.mub.estado = 'Activo'
    this.mub.tipo = 'inmobiliario'
    this.mub.qr = false
    this.mub.foto = ''
    this.mub.garantia = 'sin subir'

    await this.firestore.documento(this.mub, 'inventario', this.mub.id).catch((error) => {
        this.toastr.error(this.firestore.firebaseError(error.code));
      });
    this.toastr.success('Registrado Correctamente');
    this.FormM.reset();
  }

  async RegistrarMonitores() {
    if (this.FormMon.invalid) {
      this.toastr.warning('Llene los campos solicitados');
      return;
    }
    this.mon = this.FormMon.value
    this.mon.id = this.firestore.getId();
    this.mon.tipo = this.select.value.selecc;
    this.mon.estado = 'Activo';
    this.mon.qr = false
    this.mon.foto = '';
    this.mon.garantia = 'sin subir';
    await this.firestore.documento(this.mon, 'inventario', this.mon.id).catch((error) => {
        this.toastr.error(this.firestore.firebaseError(error.code));
      });
    this.toastr.success('Registrado Correctamente');
    this.FormMon.reset()
  }

  async RegistrarClima() {
    if (this.FormCl.invalid) {
      this.toastr.warning('Llene los campos solicitados');
      return;
    }
    this.clim=this.FormCl.value
    this.clim.id = this.firestore.getId();
    this.clim.estado = 'Activo';
    this.clim.garantia = 'sin subir';
    this.clim.foto = '';
    this.clim.qr = false
    this.clim.tipo = this.select.value.selecc;
    await this.firestore.documento(this.clim, 'inventario', this.clim.id).catch((error) => {
        this.toastr.error(this.firestore.firebaseError(error.code));
      });
    this.toastr.success('Registrado Correctamente');
    this.FormCl.reset();
  }

  async RegistrarProyector() {
    if (this.FormProy.invalid) {
      this.toastr.warning('Llene los campos solicitados');
      return;
    }
    this.proyc = this.FormProy.value
    this.proyc.id = this.firestore.getId();
    this.proyc.estado = 'Activo'
    this.proyc.qr = false
    this.proyc.foto = ''
    this.proyc.garantia = 'sin subir'
    this.proyc.tipo = this.select.value.selecc;
    await this.firestore.documento(this.proyc, 'inventario', this.proyc.id).catch((error) => {
        this.toastr.error(this.firestore.firebaseError(error.code));
      });
    this.toastr.success('Registrado Correctamente');
    this.FormProy.reset();
  }

  actualizarCompu() {
    if (this.FormC.invalid) {
      this.toastr.warning('Llene los campos solicitados');
      return;
    }
    if (this.id !== null) {
      this.firestore.actualizarItem(this.id, this.FormC.value);
      this.toastr.success('Editado Correctamente');
    }
  }

  actualizarMueble() {
    if (this.FormM.invalid) {
      this.toastr.warning('Llene los campos solicitados');
      return;
    }
    if (this.id !== null) {
      this.firestore.actualizarItem(this.id, this.FormM.value);
      this.toastr.success('Editado Correctamente');
    }
  }

  actualizarMonitor() {
    if (this.FormMon.invalid) {
      this.toastr.warning('Llene los campos solicitados');
      return;
    }
    if (this.id !== null) {
      this.firestore.actualizarItem(this.id, this.FormMon.value);
      this.toastr.success('Editado Correctamente');
    }
  }

  actualizarProyector() {
    if (this.FormProy.invalid) {
      this.toastr.warning('Llene los campos solicitados');
      return;
    }
    if (this.id !== null) {
      this.firestore.actualizarItem(this.id, this.FormProy.value);
      this.toastr.success('Editado Correctamente');
    }
  }

  actualizarClima() {
    if (this.FormCl.invalid) {
      this.toastr.warning('Llene los campos solicitados');
      return;
    }
    if (this.id !== null) {
      this.firestore.actualizarItem(this.id, this.FormCl.value);
      this.toastr.success('Editado Correctamente');
    }
  }

}
