import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  usuario = {
    nombreCompleto: '',
    correo: '',
    telefono: '',
    edad: null as number | null,
    contrasena: '',
    confirmarContrasena: ''
  };

  mostrarDatos = false;

  // Método que se ejecuta al enviar el formulario (solo si es válido)
  registrar(form: NgForm): void {
    if (form.invalid) {
      // Marca todos los campos como "touched" para que aparezcan los errores
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    this.mostrarDatos = true;
  }
}