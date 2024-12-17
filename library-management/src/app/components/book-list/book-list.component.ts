import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      },
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.loadBooks(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Error deleting book:', err);
      },
    });
  }
}