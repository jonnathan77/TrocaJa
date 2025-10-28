import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {
  private apiUrl = environment.urlBackend; // ex: 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  // Buscar marcas de carros
  getMarcas(): Observable<any> {
    var marcas = this.http.get<any>(`${this.apiUrl}/veiculos/marcas`);
    console.log(marcas);
    return marcas;
  }

  // Buscar modelos de uma marca
  getModelos(codigoMarca: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/veiculos/marcas/${codigoMarca}/modelos`);
  }

  // Buscar anos de um modelo
  getAnos(codigoMarca: string, codigoModelo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/veiculos/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`);
  }
}
