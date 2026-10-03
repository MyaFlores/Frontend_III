import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  // Objeto que guardará los datos capturados
  usuario = {
    nombreCompleto: '',
    correo: '',
    telefono: '',
    edad: null as number | null,
    contrasena: '',
    confirmarContrasena: ''
  };

  // Bandera para saber si el usuario ya presionó "Registrar"
  mostrarDatos = false;

  registrar(): void {
    this.mostrarDatos = true;
  }
}