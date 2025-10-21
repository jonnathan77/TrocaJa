import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendarServicoPage } from './agendar-servico.page';

const routes: Routes = [
  {
    path: '',
    component: AgendarServicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendarServicoPageRoutingModule {}
