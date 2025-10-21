import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesOficinaPageRoutingModule } from './detalhes-oficina-routing.module';

import { DetalhesOficinaPage } from './detalhes-oficina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesOficinaPageRoutingModule,
    DetalhesOficinaPage
  ],
})
export class DetalhesOficinaPageModule {}
