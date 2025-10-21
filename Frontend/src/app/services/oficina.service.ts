import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OficinaService {
  private apiUrl = 'http://localhost:3000/oficina'; // ajuste se o backend estiver hospedado em outro local

  constructor(private http: HttpClient) {}

  getOficinaById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
