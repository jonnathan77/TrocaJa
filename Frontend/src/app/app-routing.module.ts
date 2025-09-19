import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule) },
  
  // Aqui está o módulo Tabs, que será pai das 5 páginas principais
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },

  // Redirecionamento wildcard
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
