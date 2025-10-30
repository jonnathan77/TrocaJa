import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Brand } from 'src/app/models/veiculos';
import { VeiculosService } from 'src/app/services/veiculos.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('vehicleModal', { static: false }) vehicleModal!: IonModal;
  presentingElement: any = null;

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

  marcas: any[] = [];
  modelos: any[] = [];
  anos: any[] = [];

  selectedBrand: any = null;
  selectedModel: any = null;
  selectedYear: any = null;
  // mocks
  mockModels = ['Selecione a marca'];
  mockYears = ['Selecione o modelo'];

  constructor(
    private router: Router,
    private veiculosService: VeiculosService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.veiculosService.getMarcas().subscribe({
      next: (data) => {
        this.marcas = data;
      },
      error: (err) => console.error('Erro ao buscar marcas:', err),
    });
  }

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

  openBrandModal(brand: any) {
    // try to match the clicked brand with the items loaded into `marcas`
    const match = this.marcas?.find((m: any) => {
      const a = (m?.nome || m?.name || '').toString().toLowerCase();
      const b = (brand?.nome || brand?.name || '').toString().toLowerCase();
      return a && b && a === b;
    });

    this.selectedBrand = match || brand || null;
    this.selectedModel = null;
    this.selectedYear = null;
    this.modelos = [];
    this.anos = [];

    // present modal
    this.vehicleModal.present();

    // load modelos for the brand (use matched object if available)
    if (match) {
      this.onBrandChange({ detail: { value: match } });
    } else {
      this.onBrandChange(brand);
    }
  }

    ngAfterViewInit(): void {
      // ensure presentingElement is set after the view is initialized
      this.presentingElement = document.querySelector('ion-router-outlet');
    }

  // when user selects a brand inside modal (or when opening modal)
  onBrandChange(event: any) {
    // Pegar o valor selecionado do evento ou usar o brand direto
    const brand = event?.detail?.value || this.selectedBrand;

    if (!brand) {
      console.log('Nenhuma marca selecionada');
      return;
    }

    // Limpar seleções anteriores
    this.selectedModel = null;
    this.selectedYear = null;
    this.modelos = [];
    this.anos = [];

    // se marca tem codigo, buscar modelos via API
    if (brand.codigo) {
      this.veiculosService.getModelos(brand.codigo).subscribe({
        next: (res: any) => {
          this.modelos = res.modelos || res;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao buscar modelos:', err);
          this.modelos = [];
        },
      });
    } else {
      this.modelos = this.mockModels.map((m) => ({ nome: m }));
    }
  }

  confirmSelection() {
    this.vehicleModal.dismiss();
    this.router.navigate(['/tabs/cardapio-digital'], {
      queryParams: {
        brand: this.selectedBrand?.name || this.selectedBrand?.nome,
        model: this.selectedModel.nome,
        year: this.selectedYear.nome,
      },
    });
    console.log(this.selectedBrand?.name || this.selectedBrand?.nome,
        this.selectedModel,
        this.selectedYear,);
    // aqui depois você pode navegar para a tela de produtos sugeridos
  }

  openModal(brand: Brand) {
    this.selectedBrand = brand;
    this.selectedModel = null;
    this.selectedYear = null;
    this.modelos = [];
    this.anos = [];
    this.vehicleModal.present();

    // Buscar modelos da marca selecionada (se tiver código)
    if (brand && brand.codigo) {
      this.veiculosService.getModelos(brand.codigo).subscribe(
        (res) => (this.modelos = res.modelos ? res.modelos : res),
        (err) => {
          console.error('Erro ao buscar modelos', err);
          this.modelos = [];
        }
      );
    }
  }

  onModelChange() {
    if (!this.selectedModel) {
      return;
    }

    // Limpar seleção anterior de ano
    this.selectedYear = null;
    this.anos = [];

    const codigoMarca = this.selectedBrand?.codigo;
    const codigoModelo = this.selectedModel?.codigo;


    if (codigoMarca && codigoModelo) {
      this.veiculosService.getAnos(codigoMarca, codigoModelo).subscribe({
        next: (res: any) => {
          this.anos = res;
        },
        error: (err) => {
          console.error('Erro ao buscar anos:', err);
          this.anos = this.mockYears.map((y) => ({ nome: y }));
        },
      });
    } else {
      this.anos = this.mockYears.map((y) => ({ nome: y }));
    }
  }

  closeModal() {
    this.vehicleModal.dismiss();
  }
}
