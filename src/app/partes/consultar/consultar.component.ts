import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { climas, computadoras, extintores, monitores, muebles, proyectores} from 'src/app/modelos/modelos';
import { FirestoreService } from 'src/app/services/firestore.service';
import { jsPDF } from "jspdf";
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import * as pdfMake from 'pdfmake/build/pdfmake';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

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

  url : SafeUrl
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
    } else if (this.tipo === 'estanterias') {
      this.consultarmuebles(this.tipo);
    } else if (this.tipo === 'pizarrones') {
      this.consultarmuebles(this.tipo);
    }  else if (this.tipo === 'dispensadores') {
      this.consultarmuebles(this.tipo);
    }  else if (this.tipo === 'lonas') {
      this.consultarmuebles(this.tipo);
    } else if (this.tipo === 'monitores') {
      this.consultarmonitores();
    } else if (this.tipo === 'mesas') {
      this.consultarmuebles(this.tipo);
    } else if (this.tipo === 'climas') {
      this.consultarclimas();
    } else if (this.tipo === 'escritorios') {
      this.consultarmuebles(this.tipo);
    }else if (this.tipo === 'sillas') {
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
      .getCollection<muebles>('inventario', 'subtipo', tipo)
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

  descargar(url:string){
    this.url = url
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

  crearPdf(){
    for(let result of this.consultam){
    const pdfDefinition: any = {
      content: [
          { text: 'Lista de Qr de '+this.tipo, style:'header' },
          {
            layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ 'auto', 'auto', 100, '*' ],
      
              body: [
                [ 'Id', 'Edificio', 'Lugar Edificio', 'ImagenQr' ],
                [ result.id ,  result.edificio,  result.lugar_edificio,{image:'snow' ,
                width: 150,
                height: 150} ],
              ]
            }
          }
      ]   
    ,
    images:{  mySuperImage: 'data:image/jpeg;base64,...content...',
              snow: result.foto },

     styles: {
    header: {
      fontSize: 22,
      bold: true,
      alignment: 'center'
    },
    texto: {
      fontSize: 16,
    },
    datos:{
      fontSize: 16,
      decoration: 'underline'
    }
     }
    }
    pdfMake.createPdf(pdfDefinition).download()
    }
  }
}
