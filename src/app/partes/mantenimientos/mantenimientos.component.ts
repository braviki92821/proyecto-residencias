import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mantenimientos } from 'src/app/modelos/modelos';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.component.html',
  styleUrls: ['./mantenimientos.component.css']
})
export class MantenimientosComponent implements OnInit {
  mant:mantenimientos[]=[]
  select: FormGroup;
  cat = '';

  constructor(private fb: FormBuilder,private firestore: FirestoreService) {
    this.select = this.fb.group({
      selecc: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

  cambio() {
    this.cat = this.select.value.selecc;
    switch (this.cat) {
      case 'correctivo':
        return this.consultarMantenimientosC();
      case 'preventivo':
        return this.consultarMantenimientosP();
    }
  }

 consultarMantenimientosC(){
  this.firestore
  .getCollection<mantenimientos>('mantenimientos', 'tipo', 'correctivo')
  .subscribe((user) => {
    this.mant = user;
    console.log(this.mant);
  });
 }

 consultarMantenimientosP(){
  this.firestore
  .getCollection<mantenimientos>('mantenimientos', 'tipo', 'preventivo')
  .subscribe((user) => {
    this.mant = user;
    console.log(this.mant);
  });
 }
}
