import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface User {
  uid?: string;
  fullName: string;
  email: string;
  phone: string;
  userType: 'user' | 'provider';
  businessName?: string;
  address?: string;
  cnpj?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // ajuste conforme backend
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  // Registro
  register(userData: any): Observable<any> {
    console.log(`${this.apiUrl}/register`);
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Login
  login(email: string, senha: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, senha });
  }

  // Logout
  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  // Salvar usuário logado
  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Pegar usuário logado
  getCurrentUser(): User | null {
    if (!this.currentUserSubject.value) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUserSubject.next(JSON.parse(stored));
      }
    }
    return this.currentUserSubject.value;
  }

  // Forgot password (simulado)
  forgotPassword(email: string): Observable<any> {
    // No seu backend, crie rota POST /usuarios/forgot-password para enviar e-mail
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  // Buscar todos usuários
  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }
}
