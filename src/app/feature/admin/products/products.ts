import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product, ProductStatus } from '../../../core/models/product.models';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './products.html'
})
export class Products {
  private readonly productService = inject(ProductService);

  products: Product[] = [];
  loading = false;
  errorMessage = '';
  searchQuery = '';
  statusFilter: ProductStatus | '' = '';
  page = 0;
  size = 10;
  totalPages = 0;
  totalElements = 0;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    const request = this.searchQuery.trim()
      ? this.productService.searchProducts(this.searchQuery.trim(), this.page, this.size)
      : this.productService.getProducts(this.page, this.size, undefined, this.statusFilter || undefined);

    request.subscribe({
      next: (response) => {
        this.products = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message ?? 'Unable to load products.';
      }
    });
  }

  search(): void {
    this.page = 0;
    this.loadProducts();
  }

  filterChanged(): void {
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

  remove(product: Product): void {
    if (!confirm('Delete "' + product.name + '"?')) return;

    this.productService.deleteProduct(product.id).subscribe({
      next: () => this.loadProducts(),
      error: (error) => this.errorMessage = error.error?.message ?? 'Unable to delete product.'
    });
  }

  toggleStatus(product: Product): void {
    const status: ProductStatus = product.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

    this.productService.updateStatus(product.id, status).subscribe({
      next: () => this.loadProducts(),
      error: (error) => this.errorMessage = error.error?.message ?? 'Unable to update status.'
    });
  }
}
