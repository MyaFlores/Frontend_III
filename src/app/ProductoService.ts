// src/app/posts/post.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Producto } from './producto.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Simulando API
  
  // Arreglo local para simular la persistencia (ya que JSONPlaceholder no guarda)
  private productosLocales: Producto[] = [
    { id: 1, nombre: 'Leche Entera 1L', precio: 24.50, existencias: 50, categoria: 'Lácteos' },
    { id: 2, nombre: 'Arroz 1kg', precio: 32.00, existencias: 30, categoria: 'Granos' },
    { id: 3, nombre: 'Frijol Negro 1kg', precio: 28.00, existencias: 0, categoria: 'Granos' }
  ];

  // 1. GET
  getProductos(): Observable<Producto[]> {
    // En un caso real, sería: return this.http.get<Producto[]>(this.apiUrl);
    // Aquí usamos 'of' para devolver nuestros datos locales y simular la API
    return of(this.productosLocales);
  }

  // 2. POST
  crearProducto(producto: Producto): Observable<Producto> {
    const nuevoProducto = { ...producto, id: Date.now() }; // Simulamos ID
    this.productosLocales.push(nuevoProducto);
    
    // Simulamos la petición HTTP (si usaras una API real, aquí va el this.http.post)
    // return this.http.post<Producto>(this.apiUrl, producto);
    return of(nuevoProducto);
  }

  // 3. PUT / PATCH
  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    const index = this.productosLocales.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productosLocales[index] = { ...producto, id };
    }
    
    // En API real: return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
    return of({ ...producto, id });
  }

  // 4. DELETE
  eliminarProducto(id: number): Observable<any> {
    this.productosLocales = this.productosLocales.filter(p => p.id !== id);
    
    // En API real: return this.http.delete(`${this.apiUrl}/${id}`);
    return of({ success: true });
  }
}