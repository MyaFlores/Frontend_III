import { Component, signal, computed, inject } from "@angular/core";
import { CurrencyPipe, UpperCasePipe } from "@angular/common";
import { DisponibilidadPipe } from "./disponibilidad-pipe";
import { ProductosService } from "./productos";
import { Producto } from "./producto";

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe, UpperCasePipe, DisponibilidadPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{
  //Inyeccion del servicio
  private productosService = inject(ProductosService);

  //Catalogo original
  productos : Producto[] = this.productosService.getProductos();

  //Señal para la busqueda
  busqueda = signal<string>('');

  //Computed que filtra los productos segun la busqueda
  productosFiltrados = computed(() => {
    const termino = this.busqueda().trim().toLowerCase();
    if (termino === ''){
      return this.productos;
    }
    return this.productos.filter(p => p.nombre.toLowerCase().includes(termino));
  });

  actualizarBusqueda(valor: string): void{
    this.busqueda.set(valor);
  }
}