import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.models';
import { AuthService } from '../../core/services/auth.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './catalog.html'
})
export class Catalog {
  private readonly productService = inject(ProductService);
  readonly auth = inject(AuthService);

  products: Product[] = [];
  loading = false;
  errorMessage = '';
  searchQuery = '';
  page = 0;
  size = 12;
  totalPages = 0;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    const request = this.searchQuery.trim()
      ? this.productService.searchProducts(this.searchQuery.trim(), this.page, this.size)
      : this.productService.getProducts(this.page, this.size);

    request.subscribe({
      next: (response) => {
        this.products = response.content;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message ?? 'Unable to load catalog.';
      }
    });
  }

  search(): void {
    this.page = 0;
    this.loadProducts();
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.loadProducts();
    }
  }

  logout(): void {
    this.auth.logout();
  }
}
