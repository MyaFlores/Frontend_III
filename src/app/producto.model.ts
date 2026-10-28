// src/app/posts/post.model.ts
export interface Producto {
  id?: number; // Opcional porque al crear uno nuevo aún no tiene ID
  nombre: string;
  precio: number;
  existencias: number;
  categoria: string;
}