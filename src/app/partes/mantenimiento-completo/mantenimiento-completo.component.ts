import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { mantenimientos } from 'src/app/modelos/modelos';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-mantenimiento-completo',
  templateUrl: './mantenimiento-completo.component.html',
  styleUrls: ['./mantenimiento-completo.component.css']
})
export class MantenimientoCompletoComponent implements OnInit {
  newFile=''
  id: string | null;
  Item:string | null ;
  form:FormGroup;


  constructor(private router: Router, private toastr: ToastrService,
    private firestore: FirestoreService,private fb: FormBuilder,
    private aroute: ActivatedRoute) {
    this.form = this.fb.group({
      costo: ['', Validators.required],
      fechat: ['', Validators.required],
    });
    this.id=this.aroute.snapshot.paramMap.get('id');
    this.Item=this.aroute.snapshot.paramMap.get('item');
   }

  ngOnInit(): void {
  }

  subir(event: any) {
    this.newFile = event.target.files[0];
    console.log(this.newFile);
  }

 async finalizarMantenimiento(){
    if(this.id!==null && this.Item!==null){
      const data:any={
        costo:this.form.value.costo,
        fechaT:this.form.value.fechat
      }
     this.firestore.update(this.id,'mantenimientos',data);
     const res= await this.firestore.agregarArchivo(this.id,this.newFile,this.Item+'-Reportemantenimiento','pdfs/mantenimientos/');
     const archivo:any={
       reporte:res
     };
     this.firestore.update(this.id,'mantenimientos',archivo);
     const estado:any={
      estado:'Activo'
     }
     this.firestore.update(this.Item,'inventario',estado);
     this.toastr.success('Item Actualizado');
     this.router.navigate(['/mantenimientos']);
    }
  }

}
