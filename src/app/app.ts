import { Component, signal } from '@angular/core';
import { Posts } from './posts/posts';

@Component({
  imports: [Posts],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('CRUD');
}
