import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
      { path: 'buscar', loadChildren: () => import('./buscar/buscar.module').then(m => m.BuscarPageModule) },
      { path: 'agendamentos', loadChildren: () => import('./agendamentos/agendamentos.module').then(m => m.AgendamentosPageModule) },
      { path: 'veiculos', loadChildren: () => import('./veiculos/veiculos.module').then(m => m.VeiculosPageModule) },
      { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule) },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/tabs/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule {}
