import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  category: string;
  icon: string;
}

@Component({
  selector: 'app-buscar',
  templateUrl: 'buscar.page.html',
  styleUrls: ['buscar.page.scss'],
  standalone: false,
})
export class BuscarPage {

  searchTerm: string = '';
  selectedCategory: string = '';
  selectedLocation: string = '';
  maxPrice: number = 500;

  services: Service[] = [
    {
      id: 'troca-oleo-1',
      name: 'Troca de Óleo Premium',
      description: 'Troca completa com óleo sintético',
      price: 120,
      location: 'Centro',
      category: 'manutencao',
      icon: 'car-sport'
    },
    {
      id: 'alinhamento-1',
      name: 'Alinhamento Completo',
      description: 'Alinhamento e balanceamento de rodas',
      price: 80,
      location: 'Zona Sul',
      category: 'manutencao',
      icon: 'settings'
    },
    {
      id: 'freios-1',
      name: 'Revisão de Freios',
      description: 'Verificação completa do sistema de freios',
      price: 150,
      location: 'Centro',
      category: 'reparo',
      icon: 'stop-circle'
    },
    {
      id: 'bateria-1',
      name: 'Troca de Bateria',
      description: 'Instalação de bateria nova',
      price: 200,
      location: 'Zona Norte',
      category: 'reparo',
      icon: 'battery-charging'
    },
    {
      id: 'diagnostico-1',
      name: 'Diagnóstico Completo',
      description: 'Verificação geral do veículo',
      price: 100,
      location: 'Centro',
      category: 'diagnostico',
      icon: 'medical'
    }
  ];

  filteredServices: Service[] = [...this.services];

  constructor(private router: Router) {}

  onSearch(event: any) {
    this.searchTerm = event.detail.value;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredServices = this.services.filter(service => {
      const matchesSearch = !this.searchTerm || 
        service.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || service.category === this.selectedCategory;
      const matchesLocation = !this.selectedLocation || service.location === this.selectedLocation;
      const matchesPrice = service.price <= this.maxPrice;

      return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    });
  }

  goToServiceDetail(serviceId: string) {
    // Navigate to service detail page
    console.log('Navigate to service detail:', serviceId);
    // this.router.navigate(['/service-detail', serviceId]);
  }

}
