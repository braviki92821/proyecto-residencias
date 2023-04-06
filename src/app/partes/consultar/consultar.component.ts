import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { climas, computadoras, extintores, monitores, muebles, proyectores} from 'src/app/modelos/modelos';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
})

export class ConsultarComponent implements OnInit {
  edificios: FormGroup;
  //
  consultam: muebles[];
  consultarc: computadoras[];
  consultamon: monitores[];
  consultapro: proyectores[];
  consultacl: climas[];
  consultaex: extintores[];

  tipo: string | null;

  edificio = [ 'Edificio 1', 'Edificio 2', 'Edificio 3', 'Edificio 4', 'Edificio 5', 'Edificio Cristal', 'Gallineros', 'Cubiculos'];

  constructor( private fb: FormBuilder, private toastr: ToastrService, private firestore: FirestoreService, private aroute: ActivatedRoute) {
    this.edificios = this.fb.group({
      organizar: ['', Validators.required],
  });
    this.tipo = this.aroute.snapshot.paramMap.get('tipo');
  }

  ngOnInit(): void {
    this.tipoT();
  }

  tipoT(): string {
    let texto = String(this.tipo);
    if (this.tipo === 'mesabancos') {
      this.consultarmuebles(this.tipo);
    } else if (this.tipo === 'muebles') {
      this.consultarmuebles(this.tipo);
    } else if (this.tipo === 'pizarrones') {
      this.consultarmuebles(this.tipo);
    } else if (this.tipo === 'monitores') {
      this.consultarmonitores();
    } else if (this.tipo === 'mesas') {
      this.consultarmuebles(this.tipo);
    } else if (this.tipo === 'climas') {
      this.consultarclimas();
    } else if (this.tipo === 'escritorios') {
      this.consultarmuebles(this.tipo);
    } else if (this.tipo === 'proyectores') {
      this.consultarproyectores();
    } else if (this.tipo == 'computadoras') {
      this.consultarcomputadoras();
    }
    return texto;
  }

  consultarmuebles(tipo: string) {
    this.firestore
      .getCollection<muebles>('inventario', 'tipo', tipo)
      .subscribe((user) => {
        this.consultam = user;
      });
  }

  consultarcomputadoras() {
    this.firestore
      .getCollection<computadoras>('inventario', 'tipo', 'computadoras')
      .subscribe((user) => {
        this.consultarc = user;
      });
  }

  consultarmonitores() {
    this.firestore
      .getCollection<monitores>('inventario', 'tipo', 'monitores')
      .subscribe((user) => {
        this.consultamon = user;
      });
  }

  consultarproyectores() {
    this.firestore
      .getCollection<proyectores>('inventario', 'tipo', 'proyectores')
      .subscribe((user) => {
        this.consultapro = user;
      });
  }

  consultarclimas() {
    this.firestore
      .getCollection<climas>('inventario', 'tipo', 'climas')
      .subscribe((user) => {
        this.consultacl = user;
      });
  }

  eliminar(id: string) {
    this.firestore
      .borrarItem(id)
      .then(() => {
        this.toastr.success('Item eliminado con exito');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
