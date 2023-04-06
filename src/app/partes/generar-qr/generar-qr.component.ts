import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.component.html',
  styleUrls: ['./generar-qr.component.css'],
})

export class GenerarQrComponent implements OnInit {

  id: string | null;
  path: String;
  url: SafeUrl;
  newImage = '';

  data:any={
    qr:true,
    foto:''
  }

  constructor(
    private aroute: ActivatedRoute,
    private firestore: FirestoreService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.id = this.aroute.snapshot.paramMap.get('id');
  }

  qr(url: SafeUrl) {
    this.url = url;
  }

  subir(event: any) {
    this.newImage = event.target.files[0];
    console.log(this.newImage)
  }

  async upload() {
    if (this.id !== null && this.newImage!=='' && this.newImage!==undefined) {
      const res = await this.firestore.agregarArchivo(this.id, this.newImage, this.id,'Qrs/');
      console.log(res)
      this.data.foto=res
      this.firestore.update(this.id,'inventario',this.data);
      this.toastr.success('Qr subido correctamente');
      this.router.navigate(['/consultar']);
    }else{
      this.toastr.error('No ha seleccionado una imagen');
    }
  }

  ngOnInit(): void {}
}
