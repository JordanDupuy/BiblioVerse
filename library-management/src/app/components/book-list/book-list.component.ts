import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [CommonModule],
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  editingBook: any = null; // Livre en cours de modification

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks(); // Charger les livres au démarrage
  }

  // Charger la liste des livres
  loadBooks() {
    this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data;
        this.filteredBooks = [...this.books];
        this.renderChart();
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  safeApplyFilter(field: string, event: Event) {
    const target = event.target as HTMLInputElement | null;
    const value = target?.value || ''; // Si target est null, on retourne une chaîne vide
    this.applyFilter(field, value);
  }

  // Filtrer les livres
  applyFilter(field: string, value: string) {
    this.filteredBooks = this.books.filter((book) =>
      book[field]?.toLowerCase().includes(value.toLowerCase())
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
    const target = event.target as HTMLInputElement | null; // Cast explicite
    if (this.editingBook && target?.value) {
      this.editingBook[field] = target.value;
    }
  }
  

  // Visualisation des livres par catégorie
  renderChart() {
    const categories = this.books.reduce((acc, book) => {
      acc[book.category] = (acc[book.category] || 0) + 1;
      return acc;
    }, {});

    const ctx = document.getElementById('booksChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(categories),
        datasets: [
          {
            label: 'Number of Books',
            data: Object.values(categories),
            backgroundColor: '#4CAF50',
          },
        ],
      },
    });
  }

}
