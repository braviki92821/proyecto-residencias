import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms';
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
  FormC: FormGroup;
  FormM: FormGroup;
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
    garantia: 'sin subir',
  };
  mub: muebles = {
    id: '',
    nombre: '',
    marca: '',
    caracteristicas: '',
    estado: 'Activo',
    edificio: '',
    lugar_edificio: '',
    tipo: '',
    qr: false,
    foto: '',
    costo: '',
    garantia: 'sin subir',
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
    estado: 'Activo',
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
    estado: 'Activo',
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
      Costo: ['', Validators.required],
      edificio: ['', Validators.required],
      lugar_edificio: ['', Validators.required],
    });

    this.FormM = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      caracteristicas: ['', Validators.required],
      Costo: ['', Validators.required],
      edificio: ['', Validators.required],
      lugar_edificio: ['', Validators.required],
      tipo:['',Validators.required]
    });

    this.FormMon = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      tipoentrada: ['', Validators.required],
      hz: ['', Validators.required],
      resolucion: ['', Validators.required],
      Costo: ['', Validators.required],
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
      Costo: ['', Validators.required],
      edificio: ['', Validators.required],
      lugar_edificio: ['', Validators.required],
    });

    this.FormProy = this.fb.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      tipoentrada: ['', Validators.required],
      Costo: ['', Validators.required],
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
        this.image = data.payload.data()['foto'];
        if (this.select.value.selecc === 'computadoras') {
          this.FormC.setValue({
            PlacaMadre: data.payload.data()['PlacaMadre'],
            Procesador: data.payload.data()['Procesador'],
            DiscoDuro: data.payload.data()['DiscoDuro'],
            Ram: data.payload.data()['Ram'],
            SO: data.payload.data()['SO'],
            Costo: data.payload.data()['costo'],
            edificio: data.payload.data()['edificio'],
            lugar_edificio: data.payload.data()['lugar_edificio'],
          });
        } else if (this.select.value.selecc === 'mueble') {
          this.FormM.setValue({
            nombre: data.payload.data()['nombre'],
            marca: data.payload.data()['marca'],
            caracteristicas: data.payload.data()['caracteristicas'],
            Costo: data.payload.data()['costo'],
            edificio: data.payload.data()['edificio'],
            lugar_edificio: data.payload.data()['lugar_edificio'],
          });
        } else if (this.select.value.selecc === 'monitores') {
          this.FormMon.setValue({
            nombre: data.payload.data()['nombre'],
            marca: data.payload.data()['marca'],
            tipoentrada: data.payload.data()['tipoentrada'],
            hz: data.payload.data()['hz'],
            resolucion: data.payload.data()['resolucion'],
            Costo: data.payload.data()['costo'],
            edificio: data.payload.data()['edificio'],
            lugar_edificio: data.payload.data()['lugar_edificio'],
          });
        } else if (this.select.value.selecc === 'proyectores') {
          this.FormProy.setValue({
            nombre: data.payload.data()['modelo'],
            marca: data.payload.data()['marca'],
            tipoentrada: data.payload.data()['tipoentrada'],
            Costo: data.payload.data()['costo'],
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
            Costo: data.payload.data()['Costo'],
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
    this.compus.id = this.firestore.getId();
    this.compus.PlacaMadre = this.FormC.value.PlacaMadre;
    this.compus.Procesador = this.FormC.value.Procesador;
    this.compus.DiscoDuro = this.FormC.value.DiscoDuro;
    this.compus.Ram = this.FormC.value.Ram;
    this.compus.SO = this.FormC.value.SO;
    this.compus.costo = this.FormC.value.Costo;
    this.compus.estado = 'Activo';
    this.compus.edificio = this.FormC.value.edificio;
    this.compus.lugar_edificio = this.FormC.value.lugar_edificio;
    this.compus.tipo = this.select.value.selecc;
    this.compus.qr = false;
    this.compus.foto = '';

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
    this.mub.id = this.firestore.getId();
    this.mub.nombre = this.FormM.value.nombre;
    this.mub.marca = this.FormM.value.marca;
    this.mub.caracteristicas = this.FormM.value.caracteristicas;
    this.mub.costo = this.FormM.value.Costo;
    this.mub.edificio = this.FormM.value.edificio;
    this.mub.lugar_edificio = this.FormM.value.lugar_edificio;
    this.mub.tipo = this.FormM.value.tipo;
    await this.firestore
      .documento(this.mub, 'inventario', this.mub.id)
      .catch((error) => {
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
    this.mon.id = this.firestore.getId();
    this.mon.nombre = this.FormMon.value.nombre;
    this.mon.marca = this.FormMon.value.marca;
    this.mon.resolucion = this.FormMon.value.resolucion;
    this.mon.hz = this.FormMon.value.hz;
    this.mon.tipoentrada = this.FormMon.value.tipoentrada;
    this.mon.costo = this.FormMon.value.Costo;
    this.mon.edificio = this.FormMon.value.edificio;
    this.mon.lugar_edificio = this.FormMon.value.lugar_edificio;
    this.mon.tipo = this.select.value.selecc;
    this.mon.foto = '';
    await this.firestore
      .documento(this.mon, 'inventario', this.mon.id)
      .catch((error) => {
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
    this.clim.id = this.firestore.getId();
    this.clim.nombre=this.FormCl.value.nombre;
    this.clim.alto_ancho = this.FormCl.value.alto_ancho;
    this.clim.capacidade = this.FormCl.value.capacidade;
    this.clim.capacidadt = this.FormCl.value.capacidadt;
    this.clim.consumo = this.FormCl.value.consumo;
    this.clim.costo = this.FormCl.value.Costo;
    this.clim.edificio = this.FormCl.value.edificio;
    this.clim.lugar_edificio = this.FormCl.value.lugar_edificio;
    this.clim.modelo = this.FormCl.value.modelo;
    this.clim.tipo = this.select.value.selecc;
    await this.firestore
      .documento(this.clim, 'inventario', this.clim.id)
      .catch((error) => {
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
    this.proyc.id = this.firestore.getId();
    this.proyc.modelo = this.FormProy.value.nombre;
    this.proyc.marca = this.FormProy.value.marca;
    this.proyc.tipoentrada = this.FormProy.value.tipoentrada;
    this.proyc.costo = this.FormProy.value.Costo;
    this.proyc.edificio = this.FormProy.value.edificio;
    this.proyc.lugar_edificio = this.FormProy.value.lugar_edificio;
    this.proyc.tipo = this.select.value.selecc;
    await this.firestore
      .documento(this.proyc, 'inventario', this.proyc.id)
      .catch((error) => {
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
      const computadora: any = {
        PlacaMadre: this.FormC.value.PlacaMadre,
        Procesador: this.FormC.value.Procesador,
        DiscoDuro: this.FormC.value.DiscoDuro,
        Ram: this.FormC.value.Ram,
        SO: this.FormC.value.SO,
        Costo: this.FormC.value.Costo,
        edificio: this.FormC.value.edificio,
        lugar_edificio: this.FormC.value.lugar_edificio,
      };
      this.firestore.actualizarItem(this.id, computadora);
      this.toastr.success('Editado Correctamente');
    }
  }

  actualizarMueble() {
    if (this.FormM.invalid) {
      this.toastr.warning('Llene los campos solicitados');
      return;
    }
    if (this.id !== null) {
      const mueble: any = {
        nombre: this.FormM.value.nombre,
        marca: this.FormM.value.marca,
        caracteristicas: this.FormM.value.caracteristicas,
        costo: this.FormM.value.Costo,
        edificio: this.FormM.value.edificio,
        lugar_edificio: this.FormM.value.lugar_edificio,
      };
      this.firestore.actualizarItem(this.id, mueble);
      this.toastr.success('Editado Correctamente');
    }
  }

  actualizarMonitor() {
    if (this.FormMon.invalid) {
      this.toastr.warning('Llene los campos solicitados');
      return;
    }
    if (this.id !== null) {
      const monitor: any = {
        nombre: this.FormMon.value.nombre,
        marca: this.FormMon.value.marca,
        tipoentrada: this.FormMon.value.tipoentrada,
        hz: this.FormMon.value.hz,
        resolucion: this.FormMon.value.resolucion,
        Costo: this.FormMon.value.Costo,
        edificio: this.FormMon.value.edificio,
        lugar_edificio: this.FormMon.value.lugar_edificio,
      };
      this.firestore.actualizarItem(this.id, monitor);
      this.toastr.success('Editado Correctamente');
    }
  }

  actualizarProyector() {
    if (this.FormProy.invalid) {
      this.toastr.warning('Llene los campos solicitados');
      return;
    }
    if (this.id !== null) {
      const proyector: any = {
        nombre: this.FormProy.value.nombre,
        marca: this.FormProy.value.marca,
        tipoentrada: this.FormProy.value.tipoentrada,
        Costo: this.FormProy.value.Costo,
        edificio: this.FormProy.value.edificio,
        lugar_edificio: this.FormProy.value.lugar_edificio,
      };
      this.firestore.actualizarItem(this.id, proyector);
      this.toastr.success('Editado Correctamente');
    }
  }

  actualizarClima() {
    if (this.FormCl.invalid) {
      this.toastr.warning('Llene los campos solicitados');
      return;
    }
    if (this.id !== null) {
      const clima: any = {
        nombre: this.FormCl.value.nombre,
        capacidadt: this.FormCl.value.capacidadt,
        capacidade: this.FormCl.value.capacidade,
        modelo: this.FormCl.value.modelo,
        consumo: this.FormCl.value.consumo,
        alto_ancho: this.FormCl.value.alto_ancho,
        Costo: this.FormCl.value.Costo,
        edificio: this.FormCl.value.edificio,
        lugar_edificio: this.FormCl.value.lugar_edificio,
      };
      this.firestore.actualizarItem(this.id, clima);
      this.toastr.success('Editado Correctamente');
    }
  }

  
}
