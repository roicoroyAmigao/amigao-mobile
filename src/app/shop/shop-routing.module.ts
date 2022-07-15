import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPage } from './components/cart/cart.page';
import { ShopPage } from './shop.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: ShopPage,
    children: [
      {
        path: 'products-list',
        loadChildren: () => import('./products-list/products-list.module').then(m => m.ProductsListPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/products-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/products-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ShopPageRoutingModule { }
