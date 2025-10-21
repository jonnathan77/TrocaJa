import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesOficinaPage } from './detalhes-oficina.page';

const routes: Routes = [
  {
    path: ':id',
    component: DetalhesOficinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesOficinaPageRoutingModule {}
