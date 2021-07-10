import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HowGetTokenComponent } from './how-get-tocken/how-get-token.component';
import { InstructionActivateProdComponent } from './instuction-activate-prod/instruction-activate-prod.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'portfolio',
    pathMatch: 'full',
  },
  {
    path: 'how-get-token',
    component: HowGetTokenComponent,
  },
  {
    path: 'instruction-activate-prod',
    component: InstructionActivateProdComponent,
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then(m => m.StoreModule),
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule),
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule),
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule),
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail-info/detail-info.module').then(m => m.DetailInfoModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./personal-area/personal-area.module').then(m => m.PersonalAreaModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
