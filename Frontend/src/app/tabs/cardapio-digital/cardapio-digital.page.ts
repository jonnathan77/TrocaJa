import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs =
  (pdfFonts as any).vfs || (pdfFonts as any).pdfMake?.vfs;
 
@Component({
  selector: 'app-cardapio-digital',
  templateUrl: './cardapio-digital.page.html',
  styleUrls: ['./cardapio-digital.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // 👈 ADICIONE ISSO AQUI
  ],
})
export class CardapioDigitalPage implements OnInit {
  pneus: any[] = [];
  oleos: any[] = [];
  filtros: any[] = [];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.pneus = [
      {
        name: 'Pneu Goodyear 175/70 R14',
        price: 349.9,
        image: 'assets/img/pneu1.jpg',
        selected: false,
      },
      {
        name: 'Pneu Pirelli 185/65 R15',
        price: 389.5,
        image: 'assets/img/pneu2.jpg',
        selected: false,
      },
      {
        name: 'Pneu Michelin 195/55 R16',
        price: 459.0,
        image: 'assets/img/pneu3.jpg',
        selected: false,
      },
    ];

    this.oleos = [
      {
        name: 'Óleo 5W30 Sintético',
        price: 69.9,
        image: 'assets/img/oleo1.jpg',
        selected: false,
      },
      {
        name: 'Óleo 10W40 Semi-Sintético',
        price: 59.9,
        image: 'assets/img/oleo2.jpg',
        selected: false,
      },
      {
        name: 'Óleo 20W50 Mineral',
        price: 49.9,
        image: 'assets/img/oleo3.jpg',
        selected: false,
      },
    ];

    this.filtros = [
      {
        name: 'Filtro de Ar Bosch',
        price: 39.9,
        image: 'assets/img/filtro1.jpg',
        selected: false,
      },
      {
        name: 'Filtro de Ar Fram',
        price: 35.0,
        image: 'assets/img/filtro2.jpg',
        selected: false,
      },
      {
        name: 'Filtro de Ar Tecfil',
        price: 32.5,
        image: 'assets/img/filtro3.jpg',
        selected: false,
      },
    ];
  }

  toggleSelect(produto: any) {
    produto.selected = !produto.selected;
  }

  removeProduct(produto: any) {
    produto.selected = false;
  }

  proceed() {
    const selecionados = [
      ...this.pneus.filter((p) => p.selected),
      ...this.oleos.filter((o) => o.selected),
      ...this.filtros.filter((f) => f.selected),
    ];

    console.log('Produtos selecionados:', selecionados);
    this.navCtrl.navigateForward('/tabs/checkout'); // ajuste pra sua rota
  }

  voltar() {
    this.navCtrl.back();
  }

  //#region PDF Generation
  gerarPdf() {
    const selecionados = [
      ...this.pneus.filter((p) => p.selected),
      ...this.oleos.filter((o) => o.selected),
      ...this.filtros.filter((f) => f.selected),
    ];

    const total = selecionados.reduce(
      (sum, item) => sum + (item.price || 0),
      0
    );

    const docDefinition: any = {
      content: [
        { text: 'Resumo do Pedido', style: 'header' },
        {
          text: new Date().toLocaleString(),
          alignment: 'right',
          margin: [0, 0, 0, 20],
        },
        {
          table: {
            widths: ['*', 'auto', 'auto'],
            body: [
              ['Produto', 'Qtd', 'Preço (R$)'],
              ...selecionados.map((i) => [
                i.name,
                1,
                (i.price ?? 0).toFixed(2),
              ]),
              [
                { text: 'Total', colSpan: 2, alignment: 'right' },
                {},
                total.toFixed(2),
              ],
            ],
          },
        },
        { text: '\nObrigado por comprar conosco!', style: 'footer' },
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        footer: { italics: true, alignment: 'center' },
      },
    };

    // 🔹 Corrige o carregamento das fontes (necessário antes de gerar PDF)
    pdfMake.createPdf(docDefinition).getBlob((blob: Blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }
  //#endregion
}
