import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import * as maplibregl from 'maplibre-gl';


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
  standalone: false,
})
export class BuscarPage implements AfterViewInit {
  map!: maplibregl.Map;
  userMarker!: maplibregl.Marker;
  private officeMarkers: maplibregl.Marker[] = [];

  searchTerm = '';
  selectedCategory = '';
  selectedLocation = '';
  maxPrice = 500;

  offices = [
    { id: 1, name: 'Oficina do João', service: 'Troca de óleo', distance: 1.2 },
    { id: 2,name: 'Mecânica Silva', service: 'Mecânica geral', distance: 2.5 },
    { id: 3,name: 'Auto Center Car', service: 'Suspensão e freios', distance: 3.1 },
    { id: 4, name: 'Oficina Rapidão', service: 'Elétrica automotiva', distance: 0.8 },
  ];
  slideOpts = {
    slidesPerView: 1.2, // mostra parte do próximo card
    spaceBetween: 15, // espaço entre slides
    freeMode: true,
  };

  filtros: string[] = ['Todos', 'Mecânica Geral', 'Óleo', 'Revisão'];
  filtroSelecionado = 'Todos';

  services: Service[] = [
    {
      id: 'troca-oleo-1',
      name: 'Troca de Óleo Premium',
      description: 'Troca completa com óleo sintético',
      price: 120,
      location: 'Centro',
      category: 'manutencao',
      icon: 'car-sport',
      lat: -19.92,
      lng: -43.9378,
    },
    {
      id: 'alinhamento-1',
      name: 'Alinhamento Completo',
      description: 'Alinhamento e balanceamento de rodas',
      price: 80,
      location: 'Zona Sul',
      category: 'manutencao',
      icon: 'settings',
      lat: -19.93,
      lng: -43.94,
    },
    {
      id: 'freios-1',
      name: 'Revisão de Freios',
      description: 'Verificação completa',
      price: 150,
      location: 'Centro',
      category: 'reparo',
      icon: 'stop-circle',
      lat: -19.918,
      lng: -43.935,
    },
    {
      id: 'bateria-1',
      name: 'Troca de Bateria',
      description: 'Instalação de bateria nova',
      price: 200,
      location: 'Zona Norte',
      category: 'reparo',
      icon: 'battery-charging',
      lat: -19.91,
      lng: -43.925,
    },
    {
      id: 'diagnostico-1',
      name: 'Diagnóstico Completo',
      description: 'Verificação geral do veículo',
      price: 100,
      location: 'Centro',
      category: 'diagnostico',
      icon: 'medical',
      lat: -19.922,
      lng: -43.938,
    },
  ];

  filteredServices: Service[] = [...this.services];

  constructor(private router: Router) {}


  async ngAfterViewInit() {
  this.map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets/style.json?key=5yk0UaZSFs9ENWw7k0dI',
    center: [-43.9345, -19.9167],
    zoom: 13,
  });

    // adiciona controle de zoom
    this.map.addControl(new maplibregl.NavigationControl());

    // pega localização do usuário
    try {
      const pos = await Geolocation.getCurrentPosition();
      const userLatLng: [number, number] = [pos.coords.longitude, pos.coords.latitude];

      this.userMarker = new maplibregl.Marker({ color: 'blue' })
        .setLngLat(userLatLng)
        .setPopup(new maplibregl.Popup().setText('Você está aqui'))
        .addTo(this.map);

      this.map.setCenter(userLatLng);
      this.map.setZoom(15);
    } catch (err) {
      console.error('Erro ao pegar localização:', err);
    }

    // adiciona marcadores das oficinas
    this.addOfficeMarkers(this.filteredServices);
  }

  private addOfficeMarkers(services: Service[]) {
    // remove marcadores existentes
    this.officeMarkers.forEach(marker => marker.remove());
    this.officeMarkers = [];

    // adiciona novos marcadores
    services.forEach(service => {
      const element = document.createElement('div');
      element.className = 'office-marker';
      element.style.backgroundImage = `url(assets/icon/${service.icon}.png)`;
      element.style.width = '32px';
      element.style.height = '32px';
      element.style.backgroundSize = 'cover';
      element.style.cursor = 'pointer';

      const marker = new maplibregl.Marker({
        element: element,
        anchor: 'bottom'
      })
        .setLngLat([service.lng, service.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 })
            .setHTML(
              `<h4>${service.name}</h4>
               <p>${service.description}</p>
               <p>Preço: R$ ${service.price.toFixed(2)}</p>`
            )
        )
        .addTo(this.map);

      this.officeMarkers.push(marker);
    });

    services.forEach((s) => {
      const el = document.createElement('div');
      el.className = 'office-marker';
      el.style.background = 'red';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';

      el.addEventListener('click', () => {
        alert(`${s.name}\n${s.description}\nR$ ${s.price}`);
        this.router.navigate(['/service-detail', s.id]);
      });

      new maplibregl.Marker(el)
        .setLngLat([s.lng, s.lat])
        .addTo(this.map);
    });
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
    this.filteredServices = this.services.filter((service) => {
      const matchesSearch =
        !this.searchTerm ||
        service.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        this.filtroSelecionado === 'Todos' || service.category === this.filtroSelecionado;

      const matchesPrice = service.price <= this.maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    this.addOfficeMarkers(this.filteredServices);
  }

  viewDetails(office: any) {
    console.log('Ver detalhes de:', office);
    this.router.navigate(['/tabs/detalhes-oficina', office.id]);
 // ✅ agora vai cair na rota com :id
  }

  // pega localização do usuário (navegador) – retorna Promise
  private async getCurrentPosition(): Promise<{ lat: number; lng: number }> {
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });
      return {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };
    } catch (error) {
      throw new Error('Erro ao obter localização: ' + error);
    }
  }

  // calcula distância entre 2 coords em metros (Haversine)
  private haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371000; // raio da Terra em metros
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // localiza usuário, filtra oficinas por raio e atualiza marcadores
  async locateUserAndShowNearby(radiusMeters = 5000) {
    try {
      const pos = await this.getCurrentPosition();
      
      // adiciona/atualiza marcador do usuário
      if (this.userMarker) {
        this.userMarker.setLngLat([pos.lng, pos.lat]);
      } else {
        const element = document.createElement('div');
        element.className = 'user-marker';
        element.style.backgroundImage = 'url(assets/icon/user-marker.png)';
        element.style.width = '32px';
        element.style.height = '32px';
        element.style.backgroundSize = 'cover';

        this.userMarker = new maplibregl.Marker({
          element: element,
          anchor: 'bottom'
        })
          .setLngLat([pos.lng, pos.lat])
          .setPopup(new maplibregl.Popup().setHTML('Você está aqui'))
          .addTo(this.map);
      }

      // calcula distâncias e filtra
      const nearby = this.services
        .map((s) => ({
          service: s,
          distance: this.haversineDistance(pos.lat, pos.lng, s.lat, s.lng),
        }))
        .filter((x) => x.distance <= radiusMeters)
        .sort((a, b) => a.distance - b.distance);

      // se quiser mostrar somente os filtrados na lista:
      this.filteredServices = nearby.map((x) => x.service);

      // atualiza marcadores no mapa (mostra só os próximos)
      this.addOfficeMarkers(this.filteredServices);

      // ajusta bounds para mostrar usuário + oficinas
      const bounds = new maplibregl.LngLatBounds();
      bounds.extend([pos.lng, pos.lat]);
      this.filteredServices.forEach((s) => bounds.extend([s.lng, s.lat]));
      
      this.map.fitBounds(bounds, {
        padding: 50
      });
    } catch (err) {
      console.error('Erro obtendo localização:', err);
      // fallback: mantém todos os serviços visíveis
      this.filteredServices = [...this.services];
      // (opcional) mostrar mensagem pedindo permissão
    }
  }


  goToServiceDetail(serviceId: string) {
    console.log('Navigate to service detail:', serviceId);
    this.router.navigate(['/service-detail', serviceId]);
  }


}
