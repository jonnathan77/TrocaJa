import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardapioDigitalPageRoutingModule } from './cardapio-digital-routing.module';

import { CardapioDigitalPage } from './cardapio-digital.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardapioDigitalPageRoutingModule
  ],
  declarations: [CardapioDigitalPage]
})
export class CardapioDigitalPageModule {}
