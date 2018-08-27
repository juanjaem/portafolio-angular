import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Previamente hay que importar el HttpClientModule en los modulos
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root' // Gracias a esta línea no hay que declarar el servicio en los providers de los 'modules'
})
export class InfoPaginaService {

  info: InfoPagina = {}; // Esta información se almacena en los assets en formato JSON
  equipo: any[] = []; // Esta información se almacena en Firebase en formato JSON
  equipoCargado = false;
  infoCargada = false;

  constructor( private http: HttpClient ) {

    this.cargarInfo();
    this.cargarEquipo();
    this.infoCargada = true; // Indicamos que ya se recibió la data
    this.equipoCargado = true; // Indicamos que ya se recibió la data

  }

  private cargarInfo() {

    this.http.get('assets/data/data-pagina.json').subscribe( (resp: InfoPagina) => {
      this.info = resp; // guardamos lo que recibimos
      this.infoCargada = true; // Indicamos que ya se recibió la data
    });
  }


  private cargarEquipo() {

    this.http.get('https://angular-html-bd907.firebaseio.com/equipo.json').subscribe( (resp: any[]) => {
      this.equipo = resp; // guardamos lo que recibimos
      this.equipoCargado = true; // Indicamos que ya se recibió la data
    });
  }

}
