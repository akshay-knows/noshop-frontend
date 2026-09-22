import { Routes } from '@angular/router';
import { Products } from './feature/admin/products/products';

export const routes: Routes = [
    {
        path: 'admin/products',
        component: Products
    }
];
