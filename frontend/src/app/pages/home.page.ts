import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCatalogService } from '../core/product-catalog.service';
import { SeoService } from '../core/seo.service';
import { PROCESS_STEPS, ProductCategory, TRUST_POINTS } from '../data/catalog';
import { EnquiryFormComponent } from '../shared/enquiry-form.component';
import { ProductSlideshowComponent } from '../shared/product-slideshow.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, EnquiryFormComponent, ProductSlideshowComponent],
  templateUrl: './home.page.html',
})
export class HomePage implements OnInit {
  products: ProductCategory[] = [];
  readonly trust = TRUST_POINTS;
  readonly steps = PROCESS_STEPS;
  readonly regions = ['Middle East', 'Asia', 'Africa', 'Europe'];

  constructor(
    private readonly seo: SeoService,
    private readonly catalog: ProductCatalogService,
  ) {}

  ngOnInit(): void {
    this.seo.set(
      'KVS Global Exim | International Export & Import',
      'KVS Global Exim - International export and import of quality products from India. Indian agricultural products for international buyers.',
    );
    this.catalog.list().subscribe((items) => {
      this.products = items;
    });
  }
}
