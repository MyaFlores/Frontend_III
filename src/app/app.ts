import { Component } from '@angular/core';
import { Registro } from './registro/registro';

@Component({
  selector: 'app-root',
  imports: [Registro],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}