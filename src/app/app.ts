import { Component, computed, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  titulo = 'Talleres disponibles';
  talleres = [
    { 
      id: 1, nombre: 
      'Introducción a HTML', 
      duracion: '2 Horas'
    },
    { 
      id: 2, 
      nombre: 'CSS básico', 
      duracion: '3 Horas'
    },
    { 
      id: 3, 
      nombre: 'JavaScript', 
      duracion: '4 horas'
    },
    { id: 4, 
      nombre: 'Angular',
      duracion: '4 horas'
    },
    { 
      id: 5, 
      nombre: 'React', 
      duracion: '5 horas'
    }
  ];

  inscritos = signal<number[]>([]);

  readonly LIMITE = 2;

  talleresSeleccionados = computed(() =>
    this.talleres.filter(t => this.inscritos().includes(t.id))
  );

  limite = computed(() => this.inscritos().length >= this.LIMITE);

  inscribete(id: number): void {
    if(this.inscritos().includes(id))
      return;
    if(this.inscritos().length >= this.LIMITE) 
      return;
    
    this.inscritos.update(actuales => [...actuales, id]);
  }

  cancelar(id: number){
    this.inscritos.update(actuales => actuales.filter(i => i !== id));
  }

  cancelarTodas(): void {
    this.inscritos.set([])
  }
  
}
