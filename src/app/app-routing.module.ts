import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { ChecaremailComponent } from './partes/checaremail/checaremail.component';
import { ConsultarComponent } from './partes/consultar/consultar.component';
import { ConsultarusersComponent } from './partes/consultarusers/consultarusers.component';
import { CrudComponent } from './partes/crud/crud.component';
import { DashboardComponent } from './partes/dashboard/dashboard.component';
import { GarantiasComponent } from './partes/garantias/garantias.component';
import { GenerarQrComponent } from './partes/generar-qr/generar-qr.component';
import { LoginComponent } from './partes/login/login.component';
import { MantenimientoCompletoComponent } from './partes/mantenimiento-completo/mantenimiento-completo.component';
import { MantenimientosComponent } from './partes/mantenimientos/mantenimientos.component';
import { MenuConsultarComponent } from './partes/menu-consultar/menu-consultar.component';
import { RecoverypassComponent } from './partes/recoverypass/recoverypass.component';
import { RegistroComponent } from './partes/registro/registro.component';
import { ReportesComponent } from './partes/reportes/reportes.component';
import { ScannerqrComponent } from './partes/scannerqr/scannerqr.component';
import { AuthGuard } from './services/auth.guard';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent,},
  { path: 'checaremail', component: ChecaremailComponent },
  { path: 'recuperarcontraseña', component: RecoverypassComponent },
  { path: 'registrar-inventario', component: CrudComponent,canActivate:[AuthGuard]},
  { path: 'editar-articulo/:id/:tipo',component: CrudComponent,canActivate:[AuthGuard]},
  { path: 'menu-consultar', component: MenuConsultarComponent,canActivate:[AuthGuard]},
  { path: 'consultar/:tipo', component: ConsultarComponent,canActivate:[AuthGuard]},
  { path: 'dashboard', component: DashboardComponent,canActivate: [AngularFireAuthGuard]},
  { path: 'generarQr',component: GenerarQrComponent,canActivate:[AuthGuard]},
  { path: 'garantia/:id/:tipo', component: GarantiasComponent,canActivate:[AuthGuard]},
  { path: 'usuarios',component:ConsultarusersComponent,canActivate:[AuthGuard]},
  { path: 'scanearQr',component:ScannerqrComponent,canActivate: [AngularFireAuthGuard]} ,
  { path: 'reportes',component:ReportesComponent,canActivate:[AuthGuard]},
  { path: 'mantenimientos',component:MantenimientosComponent,canActivate:[AuthGuard]},
  { path: 'completar-mantenimiento/:id/:item',component:MantenimientoCompletoComponent,canActivate:[AuthGuard]},
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
