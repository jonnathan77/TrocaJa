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

  brands = [
    { name: 'Ford', logo: 'assets/brands/ford.jpeg' },
    { name: 'Fiat', logo: 'assets/brands/fiat.webp' },
    { name: 'Volkswagen', logo: 'assets/brands/vw.jpg' },
    { name: 'Chevrolet', logo: 'assets/brands/chevrolet.jpg' },
    { name: 'Toyota', logo: 'assets/brands/toyota.png' },
    { name: 'Honda', logo: 'assets/brands/honda.png' },
  ];

  categories = [
    { name: 'Freios', icon: 'construct-outline' },
    { name: 'Óleo', icon: 'water-outline' },
    { name: 'Pneus', icon: 'car-outline' },
  ];

  products = [
    {
      name: 'Pneu Michelin Aro 15',
      price: 499.9,
      image: 'assets/products/pneu.jpg',
    },
    {
      name: 'Óleo 5W30 Castrol',
      price: 79.9,
      image: 'assets/products/oleoCastrol.webp',
    },
    {
      name: 'Filtro de Ar Bosch',
      price: 45.0,
      image: 'assets/products/filtrodeAr.jpg',
    },
    {
      name: 'Pastilha de Freio TRW',
      price: 149.0,
      image: 'assets/products/pastilha.jpg',
    },
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

  selectProduct(produto: any) {
    console.log('Selecionado:', produto);
    // aqui você pode abrir modal, adicionar ao carrinho, etc.
  }
}
