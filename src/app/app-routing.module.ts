import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './core/error/error.component';
import { HomePageComponent } from './features/pages/home-page/home-page.component';
import { NotFoundComponent } from './features/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
    data: {
      title: 'Home',
    } 
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {
      title: 'Page Not Found',
    } 
  },
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      title: 'ERROR',
    } 
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'recipe',
    loadChildren: () => import('./features/recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }