import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgendamentosPageRoutingModule } from './agendamentos-routing.module';

import { AgendamentosPage } from './agendamentos.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AgendamentosPageRoutingModule
  ],
  declarations: [AgendamentosPage]
})
export class AgendamentosPageModule {}
