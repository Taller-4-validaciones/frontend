import { EstudianteService } from './estudiante.service';
import { Estudiante } from './estudiante';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public estudiante: Estudiante = new Estudiante;
  public titulo: String = 'Crear estudiante';
  public errores: string[] = [];

  constructor(private estudianteService: EstudianteService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.estudianteService.getEstudianteByCode(codigo).subscribe(
        estudiante => this.estudiante = estudiante
      );
    }
  }

  public updateEstudiante() {

    this.estudianteService.update(this.estudiante).subscribe(
      respose =>
      {
        this.router.navigate(['/estudiantes']),
        swal.fire('Estudiante', `Estudiante ${respose.nombre} actualizado con éxito!`, 'success');
     },
      err => {
        const map = new Map(Object.entries(err.error));
        const vector= Array.from(map.values());       
        this.errores =vector as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
  }

  public crearEstudiante()
  {
    this.estudiante.createAt = new Date().toISOString();

    this.estudianteService.create(this.estudiante).subscribe(
      respose =>
      {
        this.router.navigate(['/estudiantes']),
        swal.fire('Nuevo estudiante', `Estudiante ${respose.nombre} creado con éxito!`, 'success');
     },
      err => {
        console.log(err);

        const msg = err.error?.mensaje;
        const map = new Map(Object.entries(err.error));
        const vector= Array.from(map.values());
        this.errores = msg ? [msg] as string[] : vector as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error);
      }
    )
  }
}
