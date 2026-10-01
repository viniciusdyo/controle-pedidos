import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/clientes/pages/listar-clientes.component').then(
            (c) => c.ListarClientesComponent,
          ),
      },
      {
        path: 'produtos',
        loadComponent: () =>
          import('./features/produtos/pages/listar-produtos.component').then(
            (c) => c.ListarProdutosComponent,
          ),
      },
      {
        path: 'pedidos',
        loadComponent: () =>
          import('./features/pedidos/pages/listar-pedidos.component').then(
            (c) => c.ListarPedidosComponent,
          ),
      },
    ],
  },
];
