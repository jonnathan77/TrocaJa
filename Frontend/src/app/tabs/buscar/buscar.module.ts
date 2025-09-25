import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BuscarPageRoutingModule } from './buscar-routing.module';
import { SwiperModule } from 'swiper/angular';
import { BuscarPage } from './buscar.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BuscarPageRoutingModule,
    SwiperModule,
  ],
  declarations: [BuscarPage]
})
export class BuscarPageModule {}
