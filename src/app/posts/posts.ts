// src/app/posts/posts.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../ProductoService';
import { Producto } from '../producto.model';

@Component({
  selector: 'app-posts',
  imports: [ReactiveFormsModule],
  templateUrl: './posts.html',
  styleUrl: './posts.css'
})
export class Posts implements OnInit {
  private postService = inject(PostService);
  private fb = inject(FormBuilder);

  productos: Producto[] = [];
  productoForm: FormGroup;
  
  // Variables de control
  editando: boolean = false;
  idEditando: number | null = null;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor() {
    // Validaciones del formulario
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [null, [Validators.required, Validators.min(0.1)]],
      existencias: [null, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.postService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: () => this.mostrarMensaje('Error al cargar los productos', false)
    });
  }

  guardarProducto() {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const productoData: Producto = this.productoForm.value;

    if (this.editando && this.idEditando !== null) {
      // PUT / PATCH
      this.postService.actualizarProducto(this.idEditando, productoData).subscribe({
        next: () => {
          this.mostrarMensaje('Producto actualizado correctamente', true);
          this.cargarProductos();
          this.cancelarEdicion();
        },
        error: () => this.mostrarMensaje('Error al actualizar', false)
      });
    } else {
      // POST
      this.postService.crearProducto(productoData).subscribe({
        next: () => {
          this.mostrarMensaje('Producto agregado correctamente', true);
          this.cargarProductos();
          this.productoForm.reset();
        },
        error: () => this.mostrarMensaje('Error al agregar', false)
      });
    }
  }

  editar(producto: Producto) {
    this.editando = true;
    this.idEditando = producto.id!;
    // Cargamos los datos al formulario
    this.productoForm.patchValue({
      nombre: producto.nombre,
      precio: producto.precio,
      existencias: producto.existencias,
      categoria: producto.categoria
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.postService.eliminarProducto(id).subscribe({
        next: () => {
          this.mostrarMensaje('Producto eliminado', true);
          this.cargarProductos();
        },
        error: () => this.mostrarMensaje('Error al eliminar', false)
      });
    }
  }

  cancelarEdicion() {
    this.editando = false;
    this.idEditando = null;
    this.productoForm.reset();
  }

  mostrarMensaje(msg: string, esExito: boolean) {
    if (esExito) {
      this.mensajeExito = msg;
      this.mensajeError = '';
    } else {
      this.mensajeError = msg;
      this.mensajeExito = '';
    }
    // Ocultar después de 3 segundos
    setTimeout(() => {
      this.mensajeExito = '';
      this.mensajeError = '';
    }, 3000);
  }
}