import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { reportes } from 'src/app/modelos/modelos';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-scannerqr',
  templateUrl: './scannerqr.component.html',
  styleUrls: ['./scannerqr.component.css'],
})
export class ScannerqrComponent implements OnInit {
  FormC: FormGroup;
  FormM: FormGroup;
  FormCl: FormGroup;
  FormMon: FormGroup;
  FormProy: FormGroup;
  FormRep: FormGroup;
  //visibilidad
  data = '';
  tipo = '';
  // foto=''
  nusuario = '';
  tusuario = '';

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe: string | null | undefined;

  report: reportes = {
    Item: '',
    autor:'',
    descripcion: '',
    tipo: '',
    fecha: this.today.toLocaleDateString(),
  };

  public onEvent(e: any): void {
    this.data = e.data;
    new Audio(
      'https://github.com/id1945/ngx-scanner-qrcode/raw/master/cambeep.mp3'
    ).play();
  }

  public onError(e: any): void {
    alert(e);
  }

  public handle(action: any, fn: string): void {
    action[fn]().subscribe(console.log, console.error);
  }

  constructor(private fb: FormBuilder, private firestore: FirestoreService, private toastr: ToastrService) {
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

    this.FormRep = this.fb.group({
      id: ['', Validators.required],
      autor: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: [''],
    });
  }

  ngOnInit(): void {
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
   // console.log(this.today.toString);
  }

  consultar(data: string) {
    console.log(data);
    this.firestore.getdatos(this.data, 'inventario').subscribe((data) => {
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

  async enviarReporte() {
    this.report.Item=this.data;
    this.report.autor=this.nusuario;
    this.report.descripcion = this.FormRep.value.descripcion;
    if (this.tusuario === 'Administrador') {
      this.report.tipo = this.FormRep.value.tipo;
    } else {
      this.report.tipo = 'averia';
    }
    await this.firestore
      .documento(this.report, 'reportes', this.firestore.getId())
      .catch((error) => {
        this.toastr.error(this.firestore.firebaseError(error.code));
      });
      this.toastr.success('Reporte Enviado')
  }

}
