import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [CommonModule],
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  editingBook: any = null; // Livre en cours de modification

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  // Charger la liste des livres
  loadBooks() {
    this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  // Supprimer un livre
  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(
      () => {
        console.log('Book deleted successfully');
        this.loadBooks(); // Recharge la liste après suppression
      },
      (error) => {
        console.error('Error deleting book:', error);
      }
    );
  }

  // Débuter la modification
  startEditing(book: any) {
    this.editingBook = { ...book }; // Crée une copie du livre en cours d'édition
  }

  // Sauvegarder les modifications
  saveEdit() {
    if (this.editingBook) {
      this.bookService.updateBook(this.editingBook.id, this.editingBook).subscribe(
        () => {
          console.log('Book updated successfully');
          this.editingBook = null; // Réinitialiser le formulaire
          this.loadBooks(); // Recharger la liste des livres
        },
        (error) => {
          console.error('Error updating book:', error);
        }
      );
    }
  }

  // Annuler la modification
  cancelEdit() {
    this.editingBook = null;
  }
  

onInputChange(field: string, event: Event) {
  const target = event.target as HTMLInputElement;
  if (this.editingBook && target) {
    this.editingBook[field] = target.value;
  }
}

}
