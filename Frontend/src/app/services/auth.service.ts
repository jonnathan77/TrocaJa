import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  userType: 'user' | 'provider';
  businessName?: string;
  address?: string;
  cnpj?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    // Check if user is already logged in (from localStorage)
    this.checkStoredAuth();
  }

  private checkStoredAuth(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        this.clearAuth();
      }
    }
  }

  login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        // Mock authentication - in real app, this would be an HTTP request
        if (email === 'usuario@teste.com' && password === '123456') {
          const user: User = {
            id: '1',
            email: email,
            fullName: 'João Silva',
            phone: '(11) 99999-9999',
            userType: 'user'
          };
          
          this.setCurrentUser(user);
          resolve(user);
        } else if (email === 'prestador@teste.com' && password === '123456') {
          const user: User = {
            id: '2',
            email: email,
            fullName: 'Maria Santos',
            phone: '(11) 88888-8888',
            userType: 'provider',
            businessName: 'Oficina Central',
            address: 'Rua das Flores, 123 - Centro',
            cnpj: '12.345.678/0001-90'
          };
          
          this.setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 1000);
    });
  }

  register(userData: any): Promise<User> {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        // Mock registration - in real app, this would be an HTTP request
        const user: User = {
          id: Date.now().toString(),
          email: userData.email,
          fullName: userData.fullName,
          phone: userData.phone,
          userType: userData.userType,
          businessName: userData.businessName,
          address: userData.address,
          cnpj: userData.cnpj
        };
        
        this.setCurrentUser(user);
        resolve(user);
      }, 1500);
    });
  }

  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    this.clearAuth();
    this.router.navigate(['/auth/login']);
  }

  private clearAuth(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  isProvider(): boolean {
    const user = this.getCurrentUser();
    return user ? user.userType === 'provider' : false;
  }

  isUser(): boolean {
    const user = this.getCurrentUser();
    return user ? user.userType === 'user' : false;
  }

  forgotPassword(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        // Mock password reset - in real app, this would be an HTTP request
        if (email) {
          resolve();
        } else {
          reject(new Error('E-mail inválido'));
        }
      }, 1000);
    });
  }
}
