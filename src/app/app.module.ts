import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {NgxScannerQrcodeModule} from 'ngx-scanner-qrcode'



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './partes/login/login.component';
import { RegistroComponent } from './partes/registro/registro.component';
import { DashboardComponent } from './partes/dashboard/dashboard.component';
import { ChecaremailComponent } from './partes/checaremail/checaremail.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { RecoverypassComponent } from './partes/recoverypass/recoverypass.component';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CrudComponent } from './partes/crud/crud.component';
import { ConsultarComponent } from './partes/consultar/consultar.component';
import { QRCodeComponent, QRCodeModule } from 'angularx-qrcode';
import { GenerarQrComponent } from './partes/generar-qr/generar-qr.component';
import { GarantiasComponent } from './partes/garantias/garantias.component';
import { CabeceroComponent } from './partes/cabecero/cabecero.component';
import { ConsultarusersComponent } from './partes/consultarusers/consultarusers.component';
import { ScannerqrComponent } from './partes/scannerqr/scannerqr.component';
import { ReportesComponent } from './partes/reportes/reportes.component';
import { MantenimientosComponent } from './partes/mantenimientos/mantenimientos.component';
import { MantenimientoCompletoComponent } from './partes/mantenimiento-completo/mantenimiento-completo.component';
import { FirestoreService } from './services/firestore.service';
import { HttpClientModule } from '@angular/common/http';
import { MenuConsultarComponent } from './partes/menu-consultar/menu-consultar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    DashboardComponent,
    ChecaremailComponent,
    SpinnerComponent,
    RecoverypassComponent,
    CrudComponent,
    ConsultarComponent,
    GenerarQrComponent,
    GarantiasComponent,
    CabeceroComponent,
    ConsultarusersComponent,
    ScannerqrComponent,
    ReportesComponent,
    MantenimientosComponent,
    MantenimientoCompletoComponent,
    MenuConsultarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    QRCodeModule,
    AngularFireStorageModule,
    NgxExtendedPdfViewerModule, 
    PdfViewerModule,
    NgxScannerQrcodeModule,
    HttpClientModule
  ],
  providers: [FirestoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
