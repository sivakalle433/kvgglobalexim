import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCatalogService } from '../core/product-catalog.service';
import { SeoService } from '../core/seo.service';
import { ProductCategory } from '../data/catalog';
import { ProductSlideshowComponent } from '../shared/product-slideshow.component';

@Component({
  selector: 'app-products-page',
  imports: [RouterLink, ProductSlideshowComponent],
  template: `
    <section class="page-hero">
      <div class="container">
        <p class="crumb">Home / Products</p>
        <h1>Indian agricultural products</h1>
        <p class="lede">Open a category for origin, packing and shipment notes.</p>
      </div>
    </section>
    <section class="section">
      <div class="container product-grid">
        @for (item of products; track item.slug) {
          <article class="product-card">
            <app-product-slideshow [images]="item.images" [delay]="$index * 450" />
            <div class="product-card-body">
              <h2>{{ item.name }}</h2>
              <p>{{ item.summary }}</p>
              <a class="text-link" [routerLink]="'/' + item.seoPath">View Products</a>
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class ProductsPage implements OnInit {
  products: ProductCategory[] = [];

  constructor(
    private readonly seo: SeoService,
    private readonly catalog: ProductCatalogService,
  ) {}

  ngOnInit(): void {
    this.seo.set(
      'Products | KVS Global Exim',
      'Browse Indian agricultural products available for export enquiry.',
    );
    this.catalog.list().subscribe((items) => {
      this.products = items;
    });
  }
}
