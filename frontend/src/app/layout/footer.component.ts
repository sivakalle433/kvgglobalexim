import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCatalogService } from '../core/product-catalog.service';
import { ProductCategory } from '../data/catalog';
import { SITE, whatsappUrl } from '../core/site';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  readonly site = SITE;
  readonly whatsapp = whatsappUrl();
  readonly year = new Date().getFullYear();
  products: ProductCategory[] = [];

  constructor(private readonly catalog: ProductCatalogService) {}

  ngOnInit(): void {
    this.catalog.list().subscribe((items) => {
      this.products = items;
    });
  }
}
