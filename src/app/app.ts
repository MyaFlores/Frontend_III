import { Component } from '@angular/core';
import { RegistroReactivo } from './registro-reactivo/registro-reactivo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistroReactivo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}