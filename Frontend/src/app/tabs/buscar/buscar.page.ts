import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  category: string;
  icon: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-buscar',
  templateUrl: 'buscar.page.html',
  styleUrls: ['buscar.page.scss'],
  standalone: false
})
export class BuscarPage implements AfterViewInit {

  private map!: L.Map;
  private userMarker?: L.Marker;
  private officeMarkers: L.Marker[] = [];

  searchTerm = '';
  selectedCategory = '';
  selectedLocation = '';
  maxPrice = 500;

  filtros: string[] = ['Todos', 'Mecânica Geral', 'Óleo', 'Revisão'];
  filtroSelecionado = 'Todos';

  services: Service[] = [
    { id: 'troca-oleo-1', name: 'Troca de Óleo Premium', description: 'Troca completa com óleo sintético', price: 120, location: 'Centro', category: 'manutencao', icon: 'car-sport', lat: -19.9200, lng: -43.9378 },
    { id: 'alinhamento-1', name: 'Alinhamento Completo', description: 'Alinhamento e balanceamento de rodas', price: 80, location: 'Zona Sul', category: 'manutencao', icon: 'settings', lat: -19.9300, lng: -43.9400 },
    { id: 'freios-1', name: 'Revisão de Freios', description: 'Verificação completa', price: 150, location: 'Centro', category: 'reparo', icon: 'stop-circle', lat: -19.9180, lng: -43.9350 },
    { id: 'bateria-1', name: 'Troca de Bateria', description: 'Instalação de bateria nova', price: 200, location: 'Zona Norte', category: 'reparo', icon: 'battery-charging', lat: -19.9100, lng: -43.9250 },
    { id: 'diagnostico-1', name: 'Diagnóstico Completo', description: 'Verificação geral do veículo', price: 100, location: 'Centro', category: 'diagnostico', icon: 'medical', lat: -19.9220, lng: -43.9380 }
  ];

  filteredServices: Service[] = [...this.services];

  constructor(private router: Router) {}

async ngAfterViewInit() {
    // cria o mapa
    this.map = L.map('map').setView([-19.9167, -43.9345], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // tenta pegar localização via Capacitor
    try {
      const pos = await Geolocation.getCurrentPosition(); // 👈 aqui usa o capacitor
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      // adiciona marcador do usuário
      L.marker([lat, lng]).addTo(this.map).bindPopup('Você está aqui').openPopup();
      this.map.setView([lat, lng], 15);

    } catch (err) {
      console.error('Erro ao pegar localização', err);
    }
  }

  // adiciona marcadores das oficinas (guarda em officeMarkers para manipular)
  private addOfficeMarkers(services: Service[]) {
    // limpar marcadores anteriores
    this.officeMarkers.forEach(m => this.map.removeLayer(m));
    this.officeMarkers = [];

    services.forEach(s => {
      const marker = L.marker([s.lat, s.lng]).addTo(this.map)
        .bindPopup(`<strong>${s.name}</strong><br>${s.description}<br><em>${s.location}</em><br><b>R$ ${s.price}</b>`);
      marker.on('click', () => this.goToServiceDetail(s.id));
      this.officeMarkers.push(marker);
    });
  }

  // pega localização do usuário (navegador) – retorna Promise
  private getCurrentPosition(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        err => reject(err),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }

  // calcula distância entre 2 coords em metros (Haversine)
  private haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const toRad = (v: number) => v * Math.PI / 180;
    const R = 6371000; // raio da Terra em metros
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // localiza usuário, filtra oficinas por raio e atualiza marcadores
  async locateUserAndShowNearby(radiusMeters = 5000) {
    try {
      const pos = await this.getCurrentPosition();
      // adiciona/atualiza marcador do usuário
      if (this.userMarker) {
        this.userMarker.setLatLng([pos.lat, pos.lng]);
      } else {
        this.userMarker = L.marker([pos.lat, pos.lng], {
          icon: L.icon({
            iconUrl: 'assets/icon/user-marker.png', // opcional: seu ícone
            iconSize: [32, 32],
            iconAnchor: [16, 32]
          })
        }).addTo(this.map).bindPopup('Você está aqui').openPopup();
      }

      // calcula distâncias e filtra
      const nearby = this.services
        .map(s => ({ service: s, distance: this.haversineDistance(pos.lat, pos.lng, s.lat, s.lng) }))
        .filter(x => x.distance <= radiusMeters)
        .sort((a,b) => a.distance - b.distance);

      // se quiser mostrar somente os filtrados na lista:
      this.filteredServices = nearby.map(x => x.service);

      // atualiza marcadores no mapa (mostra só os próximos)
      this.addOfficeMarkers(this.filteredServices);

      // ajusta bounds para mostrar usuário + oficinas
      const bounds = L.latLngBounds([]);
      bounds.extend([pos.lat, pos.lng]);
      this.filteredServices.forEach(s => bounds.extend([s.lat, s.lng]));
      this.map.fitBounds(bounds.pad(0.2));

    } catch (err) {
      console.error('Erro obtendo localização:', err);
      // fallback: mantém todos os serviços visíveis
      this.filteredServices = [...this.services];
      // (opcional) mostrar mensagem pedindo permissão
    }
  }

  onSearch(event: any) {
    this.searchTerm = event.detail.value;
    this.applyFilters();
  }

  selecionarFiltro(filtro: string) {
    this.filtroSelecionado = filtro;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredServices = this.services.filter(service => {
      const matchesSearch = !this.searchTerm ||
        service.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = this.filtroSelecionado === 'Todos' || service.category === this.selectedCategory || service.category === this.filtroSelecionado;
      const matchesLocation = !this.selectedLocation || service.location === this.selectedLocation;
      const matchesPrice = service.price <= this.maxPrice;

      return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    });

    // atualiza marcadores para os filtrados (se quiser)
    this.addOfficeMarkers(this.filteredServices);
  }

  goToServiceDetail(serviceId: string) {
    console.log('Navigate to service detail:', serviceId);
    // this.router.navigate(['/service-detail', serviceId]);
  }
}
