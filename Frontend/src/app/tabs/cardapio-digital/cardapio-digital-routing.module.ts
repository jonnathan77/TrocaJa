import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardapioDigitalPage } from './cardapio-digital.page';

const routes: Routes = [
  {
    path: '',
    component: CardapioDigitalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardapioDigitalPageRoutingModule {}
