import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ProdutosService } from 'src/app/services/products.service'; // ajuste o caminho
(pdfMake as any).vfs = (pdfFonts as any).vfs || (pdfFonts as any).pdfMake?.vfs;

@Component({
  selector: 'app-cardapio-digital',
  templateUrl: './cardapio-digital.page.html',
  styleUrls: ['./cardapio-digital.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CardapioDigitalPage implements OnInit {
  pneus: any[] = [];
  oleos: any[] = [];
  filtros: any[] = [];

  brand?: string;
  model?: any;
  year?: any;
  total: number = 0;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private produtosService: ProdutosService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.brand = params['brand'];
      this.model = params['model'];
      this.year = params['year'];
      console.log('Dados recebidos:', this.brand, this.model, this.year);
    });

    this.buscarProdutos();
  }

  buscarProdutos() {
    this.produtosService.getProducts('').subscribe({
      next: (produtos) => {
        console.log('Produtos recebidos:', produtos);

        // separa os produtos por tipo
        this.pneus = produtos.filter((p: any) => p.tipo === 1);
        this.filtros = produtos.filter((p: any) => p.tipo === 2);
        this.oleos = produtos.filter((p: any) => p.tipo === 3);

        // adiciona a flag de seleção
        this.pneus.forEach((p) => (p.selected = false));
        this.filtros.forEach((p) => (p.selected = false));
        this.oleos.forEach((p) => (p.selected = false));
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      },
    });
  }

  toggleSelect(produto: any) {
    produto.selected = !produto.selected;
    this.atualizarTotal();
  }

  removeProduct(produto: any) {
    produto.selected = false;
    this.atualizarTotal();
  }

  atualizarTotal() {
    const selecionados = [
      ...this.pneus.filter((p) => p.selected),
      ...this.oleos.filter((o) => o.selected),
      ...this.filtros.filter((f) => f.selected),
    ];

    this.total = selecionados.reduce((sum, item) => sum + (item.preco || 0), 0);
  }
 proceed() {
  const selecionados = [
    ...this.pneus.filter(p => p.selected),
    ...this.oleos.filter(o => o.selected),
    ...this.filtros.filter(f => f.selected)
  ];

  const total = selecionados.reduce((sum, item) => sum + (item.preco || 0), 0);

  this.navCtrl.navigateForward(['/tabs/checkout'], {
    queryParams: {
      itens: JSON.stringify(selecionados),
      total: total,
      brand: this.brand,
      model: this.model,
      year: this.year
    }
  });
}


  voltar() {
    this.navCtrl.navigateBack('/tabs/home');
  }

  //#region PDF Generation
  gerarPdf() {
    const selecionados = [
      ...this.pneus.filter((p) => p.selected),
      ...this.oleos.filter((o) => o.selected),
      ...this.filtros.filter((f) => f.selected),
    ];

    const total = selecionados.reduce(
      (sum, item) => sum + (item.preco || 0),
      0
    );
    const dataHora = new Date().toLocaleString('pt-BR');

    const docDefinition: any = {
      content: [
        { text: 'Resumo do Pedido', style: 'header' },
        {
          text: `Data e hora: ${dataHora}`,
          alignment: 'right',
          margin: [0, 0, 0, 10],
          fontSize: 10,
        },
        {
          columns: [
            { text: `Marca: ${this.brand || '-'}`, width: '33%' },
            { text: `Modelo: ${this.model || '-'}`, width: '33%' },
            { text: `Ano: ${this.year || '-'}`, width: '33%' },
          ],
          margin: [0, 0, 0, 15],
          style: 'vehicleInfo',
        },
        {
          table: {
            widths: ['*', 'auto', 'auto'],
            body: [
              [
                { text: 'Produto', bold: true },
                { text: 'Qtd', bold: true },
                { text: 'Preço (R$)', bold: true },
              ],
              ...selecionados.map((i) => [
                i.nome,
                1,
                (i.preco ?? 0).toFixed(2),
              ]),
              [
                { text: 'Total', colSpan: 2, alignment: 'right', bold: true },
                {},
                { text: total.toFixed(2), bold: true },
              ],
            ],
          },
          layout: 'lightHorizontalLines',
        },
        { text: '\nObrigado por comprar conosco!', style: 'footer' },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 15],
        },
        vehicleInfo: { fontSize: 11 },
        footer: { italics: true, alignment: 'center', margin: [0, 20, 0, 0] },
      },
    };

    pdfMake.createPdf(docDefinition).getBlob((blob: Blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }
  //#endregion
}
