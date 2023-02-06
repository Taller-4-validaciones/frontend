
import { EstudianteService } from './estudiante.service';
import { Component, OnInit } from '@angular/core';
import {Estudiante} from './estudiante';
import swal from 'sweetalert2';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  estudiantes: Estudiante[] = [];
  private objEstudianteService: EstudianteService;

  constructor(objEstudianteService: EstudianteService) {
    this.objEstudianteService = objEstudianteService;
   }

  ngOnInit(): void {
    this.objEstudianteService.getEstudiantes().subscribe(
      estudiantes => this.estudiantes = estudiantes
    );
  }

  delete(codigo: number): void {
    swal.fire({
      title: '¿Seguro que deseas eliminar al estudiante?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `No eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.objEstudianteService.delete(codigo).subscribe(
          estudiante => {
            if (estudiante) {
              swal.fire('Estudiante', `Estudiante eliminado con éxito!`, 'success')
              this.ngOnInit();
            }
          }
          )
      }
    })
  }
}
