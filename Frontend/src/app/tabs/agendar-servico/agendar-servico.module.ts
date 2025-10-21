import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendarServicoPageRoutingModule } from './agendar-servico-routing.module';

import { AgendarServicoPage } from './agendar-servico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendarServicoPageRoutingModule
  ],
  declarations: [AgendarServicoPage]
})
export class AgendarServicoPageModule {}
