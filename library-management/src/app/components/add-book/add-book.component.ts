import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  imports: [FormsModule],
})
export class AddBookComponent {
  book = { title: '', author: '', category: '' };
  isSidebarOpen = false; // État de l'onglet

  constructor(private bookService: BookService) {}

  // Basculer l'onglet (ouvrir/fermer)
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onSubmit() {
    this.bookService.addBook(this.book).subscribe(
      (response) => {
        console.log('Book added successfully:', response);
        this.book = { title: '', author: '', category: '' };
        this.toggleSidebar(); // Ferme l'onglet après ajout
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );
  }
}
