import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookListComponent } from './components/book-list/book-list.component';

@Component({
  selector: 'app-root',
  standalone: true, // Définit le composant comme standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, AddBookComponent, BookListComponent], // Importe les composants enfants
})
export class AppComponent {}
