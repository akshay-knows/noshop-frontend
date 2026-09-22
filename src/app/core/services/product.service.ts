import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { Brand, Category, PageResponse, Product, ProductRequest, ProductStatus, SubCategory } from '../models/product.models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly baseUrl = API_BASE_URL + '/product';

  constructor(private readonly http: HttpClient) {}

  getProducts(page = 0, size = 10, categoryId?: number, status?: ProductStatus): Observable<PageResponse<Product>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (categoryId) params = params.set('categoryId', categoryId);
    if (status) params = params.set('status', status);
    return this.http.get<PageResponse<Product>>(this.baseUrl + '/products', { params });
  }

  searchProducts(query: string, page = 0, size = 10): Observable<PageResponse<Product>> {
    const params = new HttpParams().set('query', query).set('page', page).set('size', size);
    return this.http.get<PageResponse<Product>>(this.baseUrl + '/products/search', { params });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + '/products/' + id);
  }

  createProduct(request: ProductRequest): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + '/products', request);
  }

  updateProduct(id: number, request: ProductRequest): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + '/products/' + id, request);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/products/' + id);
  }

  updateStatus(id: number, status: ProductStatus): Observable<Product> {
    return this.http.patch<Product>(this.baseUrl + '/products/' + id + '/status', { status });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + '/categories');
  }

  getSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.baseUrl + '/subcategories');
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseUrl + '/brands');
  }
}
