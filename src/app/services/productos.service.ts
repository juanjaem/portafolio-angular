import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  producto: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {

    // Promesa usada para usarla junto al .then en la función buscarProducto()
    // El then solo se ejecutará cuando se ejecute el resolve
    return new Promise( ( resolve, reject ) => {

      this.http.get('https://angular-html-bd907.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
          this.producto = resp;
          this.cargando = false;
          resolve();
        });

    });

  }

  getProducto( id: string ) {
    return this.http.get(`https://angular-html-bd907.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto( termino: string ) {

    if ( this.producto.length === 0 ) { // Usamos este if para evitar que se haga una búsqueda antes de que producto este cargado
      // Si no están cargados los productos, o se estan cargando, ejecutamos la carga de los productos.
      // cargarProductos devuelve una promesa. El .then se ejecutará cuando se ejecuta el resolve de la promesa
      this.cargarProductos().then( () => {
        // Se ejecuta despues de tener los productos. Entonces aplicamos el filtro
        this.filtrarProductos( termino );
      });
    } else {
      // una vez inicializado productos, siempre entrará aquí para filtrar
      this.filtrarProductos( termino );
    }

  }

  filtrarProductos( termino: string ) {
    this.productosFiltrado = []; // Reseteamos el array de elementos buscados antes de añadir la nueva busqueda

    termino = termino.toLowerCase(); // Convertimos a minusculas el término a buscar

    this.producto.forEach( prod => {

      const tituloLower = prod.titulo.toLowerCase(); // Convertimos a minusculas el texto a hacer mach en la busqueda
      const categoriaLower = prod.categoria.toLowerCase();

      if ( categoriaLower.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push( prod ); //  Los objetos que vayan coincidiendo con la busqueda los vamos almacenando aqui
      }
    });
  }

}
