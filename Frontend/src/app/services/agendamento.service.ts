import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Agendamento {
  uid?: string;
  id?: string;
  itens: any[];
  total: number;
  brand: string;
  model: string;
  year: any;
  oficina: any;
  dataAgendamento: any;
  observacoes: string;  
  status? :any;
}

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  private apiUrl = environment.urlBackend;

  constructor(private http: HttpClient) {}

  salvarAgendamento(agendamento: Agendamento): Observable<any> {
    return this.http.post(`${this.apiUrl}/agendamentos/agendamentos`, agendamento);
  }

  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/agendamentos/agendamentos`);
  }
}
