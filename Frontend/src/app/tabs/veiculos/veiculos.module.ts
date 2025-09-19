import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VeiculosPageRoutingModule } from './veiculos-routing.module';

import { VeiculosPage } from './veiculos.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    VeiculosPageRoutingModule
  ],
  declarations: [VeiculosPage]
})
export class VeiculosPageModule {}
