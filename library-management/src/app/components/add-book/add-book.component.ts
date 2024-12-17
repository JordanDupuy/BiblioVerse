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

  constructor(private bookService: BookService) {}

  onSubmit() {
    this.bookService.addBook(this.book).subscribe(
      (response) => {
        console.log('Book added successfully:', response);
        this.book = { title: '', author: '', category: '' }; // Réinitialise le formulaire
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );
  }
}
