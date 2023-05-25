import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { mantenimientos, reportes } from 'src/app/modelos/modelos';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  select: FormGroup;
  FormC: FormGroup;
  FormM: FormGroup;
  FormCl: FormGroup;
  FormMon: FormGroup;
  FormProy: FormGroup;
  tipo = '';
  rep:reportes[]=[]
  today: Date = new Date();
  
  constructor(private fb: FormBuilder,private toastr: ToastrService,private firestore: FirestoreService) {
    this.FormC = this.fb.group({
      PlacaMadre: [''],
      Procesador: [''],
      DiscoDuro: [''],
      edificio: [''],
      lugar_edificio: [''],
    });

    this.FormM = this.fb.group({
      nombre: [''],
      marca: [''],
      caracteristicas: [''],
      edificio: [''],
      lugar_edificio: [''],
    });

    this.FormMon = this.fb.group({
      nombre: [''],
      marca: [''],
      edificio: [''],
      lugar_edificio: [''],
    });

    this.FormCl = this.fb.group({
      nombre: [''],
      modelo: [''],
      consumo: [''],
      alto_ancho: [''],
      edificio: [''],
      lugar_edificio: [''],
    });

    this.FormProy = this.fb.group({
      nombre: [''],
      marca: [''],
      tipoentrada: [''],
      edificio: [''],
      lugar_edificio: [''],
    });
  }

  ngOnInit(): void {
    this.consultarReportes()
    console.log(this.today.toLocaleDateString())
  }

  consultarReportes(){
    this.firestore.getCollection<reportes>('reportes', 'estado', 'no revisado')
      .subscribe((user) => {
        this.rep = user;
        console.log(this.rep);
      });
  }

  consultar(data: string) {
    console.log(data)
    this.firestore.getdatos(data, 'inventario').subscribe((data) => {
      console.log(data.payload)
    // this.ubicacion = data.payload.data()['edificio'] + " " +data.payload.data()['lugar_edificio']
     this.tipo = data.payload.data()['tipo'];
      if (this.tipo === 'mueble') {
        this.FormM.setValue({
          nombre: data.payload.data()['nombre'],
          marca: data.payload.data()['marca'],
          caracteristicas: data.payload.data()['caracteristicas'],
          edificio: data.payload.data()['edificio'],
          lugar_edificio: data.payload.data()['lugar_edificio'], 
        });
      } else if (this.tipo === 'computadoras') {
        this.FormC.setValue({
          PlacaMadre: data.payload.data()['PlacaMadre'],
          Procesador: data.payload.data()['Procesador'],
          DiscoDuro: data.payload.data()['DiscoDuro'],
          edificio: data.payload.data()['edificio'],
          lugar_edificio: data.payload.data()['lugar_edificio'],
        });
      } else if (this.tipo === 'proyectores') {
        this.FormProy.setValue({
          nombre: data.payload.data()['modelo'],
          marca: data.payload.data()['marca'],
          tipoentrada: data.payload.data()['tipoentrada'],
          edificio: data.payload.data()['edificio'],
          lugar_edificio: data.payload.data()['lugar_edificio'],
        });
      } else if (this.tipo === 'monitores') {
        this.FormMon.setValue({
          nombre: data.payload.data()['nombre'],
          marca: data.payload.data()['marca'],
          edificio: data.payload.data()['edificio'],
          lugar_edificio: data.payload.data()['lugar_edificio'],
        });
      } else if (this.tipo === 'climas') {
        this.FormCl.setValue({
          nombre: data.payload.data()['nombre'],
          modelo: data.payload.data()['modelo'],
          consumo: data.payload.data()['consumo'],
          alto_ancho: data.payload.data()['alto_ancho'],
          edificio: data.payload.data()['edificio'],
          lugar_edificio: data.payload.data()['lugar_edificio'],
        });
      }
    });
  }

  
}
