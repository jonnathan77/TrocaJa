import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  fotosServico: string[] = [
    'assets/imagens/home/oficina1.jpg',
    'assets/imagens/home/oficina2.jpg',
    'assets/fotos/oleo3.jpg',
  ];
  constructor(private router: Router) {}

  goToServiceDetail(serviceId: string) {
    // Navigate to service detail page
    console.log('Navigate to service detail:', serviceId);
    this.router.navigate(['/service-detail', serviceId]);
  }

  goToSearch() {
    this.router.navigate(['/tabs/buscar']);
  }

  agendarServico() {
    console.log('Agendar serviço clicado');
  }
  goToAppointments() {
    this.router.navigate(['/tabs/agendamentos']);
  }
}
