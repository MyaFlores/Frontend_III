import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-reactivo',
  imports: [ReactiveFormsModule],
  templateUrl: './registro-reactivo.html',
  styleUrl: './registro-reactivo.css'
})
export class RegistroReactivo {
  // Forma moderna: usar FormBuilder (más limpio y conciso)
  private fb = inject(FormBuilder);

  formulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]]
  });

  // Objeto donde guardamos los datos al enviar
  datosRegistrados: any = null;

  // Getter para acceder más fácil a los controles en la plantilla
  get f() {
    return this.formulario.controls;
  }

  // Verifica si un campo es inválido y ya fue tocado
  esInvalido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  // Envío del formulario
  onSubmit(): void {
    if (this.formulario.invalid) {
      // Marca todos los campos como touched para mostrar los errores
      this.formulario.markAllAsTouched();
      return;
    }

    // Guardamos los datos para mostrarlos en pantalla
    this.datosRegistrados = { ...this.formulario.value };
    console.log('Datos registrados:', this.datosRegistrados);
  }

  // Reset opcional para limpiar el formulario
  limpiar(): void {
    this.formulario.reset();
    this.datosRegistrados = null;
  }
}