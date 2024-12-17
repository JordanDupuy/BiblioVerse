import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookListComponent } from './components/book-list/book-list.component';

@NgModule({
  declarations: [
    AppComponent,         // Composant principal
    AddBookComponent,     // Composant pour ajouter un livre
    BookListComponent,    // Composant pour lister les livres
  ],
  imports: [
    BrowserModule,        // Pour les fonctionnalités du navigateur
    FormsModule,          // Pour les formulaires
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // Nouvelle méthode recommandée
  ],
  bootstrap: [AppComponent], // Le composant qui démarre l'application
})
export class AppModule {}
