import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PerfilPageRoutingModule
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
