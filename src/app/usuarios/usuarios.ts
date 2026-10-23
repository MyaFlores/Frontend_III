import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario.model';

@Component({
  selector: 'app-usuarios',
  imports: [],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/users';

  usuarios: Usuario[] = [];
  cargando = true;
  error: string | null = null;

  ngOnInit(): void {
    // 👇 EL CAMBIO ESTÁ AQUÍ: Agregamos un objeto de opciones con headers
    this.http.get<Usuario[]>(this.API_URL, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    }).subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los usuarios.';
        this.cargando = false;
        console.error('Error HTTP:', err);
      }
    });
  }
}