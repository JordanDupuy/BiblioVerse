import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class BookService {
  private apiUrl = 'http://localhost:3051/post/books';

  constructor(private http: HttpClient) {}

  // Récupérer tous les livres
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Ajouter un livre
  addBook(book: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, book);
  }

  // Mettre à jour un livre
  updateBook(id: number, book: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, book);
  }

  // Supprimer un livre
  deleteBook(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
