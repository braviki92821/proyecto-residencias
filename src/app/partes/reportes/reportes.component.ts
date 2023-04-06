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
  cat = '';
  rep:reportes[]=[]
  mant:FormGroup
  today: Date = new Date();

  mante:mantenimientos={
    Item: '',
    tipo: '',
    fechaS: this.today.toLocaleDateString(),
    fechaT: '',
    costo: '',
    reporte: '',
    id: ''
  }
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private firestore: FirestoreService
  ) {
    this.select = this.fb.group({
      selecc: ['', Validators.required],
    });

    this.mant=this.fb.group({
      id:[''],
      tipo:['',Validators.required]
    })
    
  }

  ngOnInit(): void {
    console.log(this.today.toLocaleDateString())
  }

  cambio() {
    this.cat = this.select.value.selecc;
    switch (this.cat) {
      case 'averia':
        return this.consultarAverias();
      case 'preventivo':
        return this.consultarPreventivas();
      case 'mantenimiento':
        return this.consultarMantenimientos();
    }
  }

 async enviarMantenimiento(){
      this.mante.id=this.firestore.getId()
      this.mante.Item=this.mant.value.id;
      this.mante.tipo=this.mant.value.tipo;
      await this.firestore
      .documento(this.mante,'mantenimientos', this.mante.id)
      .catch((error) => {
        this.toastr.error(this.firestore.firebaseError(error.code));
      });
      const data:any={
        estado:'En mantenimiento'
      }
      this.firestore.actualizarItem(this.mante.Item,data);
      this.toastr.success('estatus actualizado del item');
      this.mant.reset();
  }

  consultarAverias(){
    this.firestore
      .getCollection<reportes>('reportes', 'tipo', 'averia')
      .subscribe((user) => {
        this.rep = user;
        console.log(this.rep);
      });
  }

  consultarPreventivas(){
    this.firestore
      .getCollection<reportes>('reportes', 'tipo', 'preventivo')
      .subscribe((user) => {
        this.rep = user;
        console.log(this.rep);
      });
  }

  consultarMantenimientos(){
    this.firestore
      .getCollection<reportes>('reportes', 'tipo', 'mantenimiento')
      .subscribe((user) => {
        this.rep = user;
        console.log(this.rep);
      });
  }
}
