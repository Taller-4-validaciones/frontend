import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  {
  public proyecto: any = {anio: '2023', nombreProyecto: 'Taller 4 P2'};
  public tecnologia: any = {leyenda: 'WebApp desarrollada con ', tec1: 'Angular', tec2: 'Spring5'};
  public autor: string = 'Daniel T';
}
