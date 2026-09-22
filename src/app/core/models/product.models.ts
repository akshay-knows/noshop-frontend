export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';
export type CatalogAudience = 'B2C' | 'B2B' | 'BOTH';

export interface Category {
  id: number;
  name: string;
  slug: string;
  displayOrder: number;
  active: boolean;
}

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
  displayOrder: number;
  active: boolean;
  categoryId: number;
  categoryName: string;
}

export interface Brand {
  id: number;
  name: string;
  description?: string;
  logoUrl?: string;
  active: boolean;
}

export interface ProductImage {
  id: number;
  imageUrl: string;
  altText?: string;
  primaryImage?: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  productType: string;
  status: ProductStatus;
  audience: CatalogAudience;
  brandId: number;
  brandName: string;
  categoryId: number;
  categoryName: string;
  subCategoryId: number;
  subCategoryName: string;
  images?: ProductImage[];
}

export interface ProductRequest {
  name: string;
  slug: string;
  description?: string;
  productType: string;
  brandId: number;
  categoryId: number;
  subCategoryId: number;
  audience: CatalogAudience;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}
