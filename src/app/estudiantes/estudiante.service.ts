import { Injectable } from '@angular/core';
import {Estudiante} from './estudiante';
import { catchError, Observable, of, throwError } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import Swal from 'sweetalert2';



@Injectable()
export class EstudianteService {

  private urlEndPoint: string = 'http://localhost:8080/api/estudiantes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<Estudiante[]> {
        return this.http.get<Estudiante[]>(this.urlEndPoint);
  }

  getEstudianteByCode(code: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(this.urlEndPoint+'/'+code).pipe(
      catchError(
        e => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire('Error al consultar estudiante',e.error.mensaje,'error');
          return throwError(e);
        }
      )
    );
}

  create(estudiante: Estudiante) : Observable<Estudiante> {
        return this.http.post<Estudiante>(this.urlEndPoint, estudiante,{headers: this.httpHeaders}).pipe(
      catchError(
        e => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire('Error al crear el estudiante',e.error.mensaje,'error');
          return throwError(e);
        }
      )
    )
  }
  update(estudiante: Estudiante) : Observable<Estudiante> {
    console.log(estudiante);

    return this.http.put<Estudiante>(this.urlEndPoint+'/'+estudiante.id, estudiante,{headers: this.httpHeaders}).pipe(
      catchError(
        e => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire('Error al actualizar el estudiante',e.error.mensaje,'error');
          return throwError(e);
        }
      )
    )
  }
  delete(codigo: number) : Observable<Estudiante> {
    return this.http.delete<Estudiante>(this.urlEndPoint+'/'+codigo).pipe(
      catchError(
        e => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire('Error al eliminar el estudiante',e.error.mensaje,'error');
          return throwError(e);
        }
      )
    )
  }
}
