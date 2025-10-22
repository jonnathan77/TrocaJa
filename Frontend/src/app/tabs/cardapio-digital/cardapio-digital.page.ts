

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

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
      { name: 'Pneu Goodyear 175/70 R14', price: 349.90, image: 'assets/img/pneu1.jpg', selected: false },
      { name: 'Pneu Pirelli 185/65 R15', price: 389.50, image: 'assets/img/pneu2.jpg', selected: false },
      { name: 'Pneu Michelin 195/55 R16', price: 459.00, image: 'assets/img/pneu3.jpg', selected: false },
    ];

    this.oleos = [
      { name: 'Óleo 5W30 Sintético', price: 69.90, image: 'assets/img/oleo1.jpg', selected: false },
      { name: 'Óleo 10W40 Semi-Sintético', price: 59.90, image: 'assets/img/oleo2.jpg', selected: false },
      { name: 'Óleo 20W50 Mineral', price: 49.90, image: 'assets/img/oleo3.jpg', selected: false },
    ];

    this.filtros = [
      { name: 'Filtro de Ar Bosch', price: 39.90, image: 'assets/img/filtro1.jpg', selected: false },
      { name: 'Filtro de Ar Fram', price: 35.00, image: 'assets/img/filtro2.jpg', selected: false },
      { name: 'Filtro de Ar Tecfil', price: 32.50, image: 'assets/img/filtro3.jpg', selected: false },
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
      ...this.pneus.filter(p => p.selected),
      ...this.oleos.filter(o => o.selected),
      ...this.filtros.filter(f => f.selected)
    ];

    console.log('Produtos selecionados:', selecionados);
    this.navCtrl.navigateForward('/resumo-pedido'); // ajuste pra sua rota
  }

  voltar() {
    this.navCtrl.back();
  }
}
