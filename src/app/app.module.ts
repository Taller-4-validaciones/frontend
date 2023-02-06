

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { EstudianteService } from './estudiantes/estudiante.service';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './estudiantes/form.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {path: '', redirectTo: '/estudiantes', pathMatch: 'full'},
    {path: 'estudiantes/form/:codigo', component: FormComponent},
    {path: 'estudiantes/form', component: FormComponent},
    {path: 'estudiantes', component: EstudiantesComponent}
  ];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EstudiantesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [EstudianteService],
  bootstrap: [AppComponent]
})
export class AppModule { }

