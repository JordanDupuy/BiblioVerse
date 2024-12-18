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
  uniqueAuthors: { name: string; count: number }[] = []; // Liste des auteurs uniques avec leur nombre
  isAuthorDropdownOpen = false; // État du menu déroulant des auteurs
  isCategoryDropdownOpen = false; // État du menu déroulant des catégories
  uniqueCategories: { name: string; count: number }[] = []; // Liste des catégories uniques avec leur nombre
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
        this.calculateUniqueAuthors(); // Calculer les auteurs uniques
        this.calculateUniqueCategories(); // Calculer les catégories uniques
        this.renderChart();
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  // Calculer les auteurs uniques avec leur nombre de livres
  calculateUniqueAuthors() {
    const authorCounts: { [key: string]: number } = {};
    this.books.forEach((book) => {
      if (book.author) {
        authorCounts[book.author] = (authorCounts[book.author] || 0) + 1;
      }
    });
    this.uniqueAuthors = Object.entries(authorCounts).map(([name, count]) => ({
      name,
      count,
    }));
  }

 // Méthode pour gérer l'ouverture/fermeture du menu Author
toggleAuthorDropdown(isOpen: boolean) {
  setTimeout(() => {
    this.isAuthorDropdownOpen = isOpen;
  }, 200); // Petit délai pour laisser le clic agir
}


  calculateUniqueCategories() {
    const categoryCounts: { [key: string]: number } = {};
    this.books.forEach((book) => {
      if (book.category) {
        categoryCounts[book.category] = (categoryCounts[book.category] || 0) + 1;
      }
    });
    this.uniqueCategories = Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count,
    }));
  }

// Méthode pour gérer l'ouverture/fermeture du menu Category
toggleCategoryDropdown(isOpen: boolean) {
  setTimeout(() => {
    this.isCategoryDropdownOpen = isOpen;
  }, 200);
}

// Filtrer par catégorie depuis le menu déroulant
selectCategory(category: string) {
  this.filteredBooks = this.books.filter(
    (book) => book.category.toLowerCase() === category.toLowerCase()
  );
  this.isCategoryDropdownOpen = false; // Fermer le menu après la sélection
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

  // Filtrer par auteur depuis le menu déroulant
  selectAuthor(author: string) {
    this.filteredBooks = this.books.filter(
      (book) => book.author.toLowerCase() === author.toLowerCase()
    );
    this.isAuthorDropdownOpen = false; // Fermer le menu après la sélection
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
