import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Brand, Category, CatalogAudience, ProductRequest, SubCategory } from '../../../../core/models/product.models';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html'
})
export class ProductForm {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    slug: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', Validators.maxLength(2000)],
    productType: ['GROCERY', [Validators.required, Validators.maxLength(50)]],
    brandId: [0, Validators.min(1)],
    categoryId: [0, Validators.min(1)],
    subCategoryId: [0, Validators.min(1)],
    audience: ['BOTH' as CatalogAudience]
  });

  brands: Brand[] = [];
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  loading = false;
  saving = false;
  errorMessage = '';
  editId: number | null = null;

  ngOnInit(): void {
    this.loadLookups();

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (Number.isInteger(id) && id > 0) {
      this.editId = id;
      this.loadProduct(id);
    }
  }

  private loadLookups(): void {
    this.productService.getBrands().subscribe({ next: (data) => this.brands = data });
    this.productService.getCategories().subscribe({ next: (data) => this.categories = data });
    this.productService.getSubCategories().subscribe({ next: (data) => this.subCategories = data });
  }

  private loadProduct(id: number): void {
    this.loading = true;

    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.form.patchValue({
          name: product.name,
          slug: product.slug,
          description: product.description ?? '',
          productType: product.productType,
          brandId: product.brandId,
          categoryId: product.categoryId,
          subCategoryId: product.subCategoryId,
          audience: product.audience
        });
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error?.message ?? 'Unable to load product.';
        this.loading = false;
      }
    });
  }

  get visibleSubCategories(): SubCategory[] {
    const categoryId = this.form.controls.categoryId.value;
    return this.subCategories.filter((item) => item.categoryId === categoryId && item.active);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';

    const request: ProductRequest = this.form.getRawValue();
    const operation = this.editId
      ? this.productService.updateProduct(this.editId, request)
      : this.productService.createProduct(request);

    operation.subscribe({
      next: () => {
        this.saving = false;
        this.router.navigateByUrl('/admin/products');
      },
      error: (error: HttpErrorResponse) => {
        this.saving = false;
        this.errorMessage = error.error?.message ?? 'Unable to save product.';
      }
    });
  }
}
