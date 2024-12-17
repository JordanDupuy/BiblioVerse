import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  book = {
    title: '',
    author: '',
    category: '',
  };

  constructor(private bookService: BookService) {}

  onSubmit() {
    this.bookService.addBook(this.book).subscribe({
      next: (response) => {
        console.log('Book added:', response);
      },
      error: (err) => {
        console.error('Error adding book:', err);
      },
    });
  }
}