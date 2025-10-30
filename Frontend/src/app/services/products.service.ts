import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private apiUrl = environment.urlBackend; // ajuste se o backend estiver hospedado em outro local

  constructor(private http: HttpClient) {}

    getProducts(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/produtos/products`);
  }
}
