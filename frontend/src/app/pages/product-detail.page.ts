import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductCatalogService } from '../core/product-catalog.service';
import { SeoService } from '../core/seo.service';
import { ProductCategory } from '../data/catalog';
import { EnquiryFormComponent } from '../shared/enquiry-form.component';
import { ProductSlideshowComponent } from '../shared/product-slideshow.component';

@Component({
  selector: 'app-product-detail-page',
  imports: [RouterLink, EnquiryFormComponent, ProductSlideshowComponent],
  templateUrl: './product-detail.page.html',
})
export class ProductDetailPage implements OnInit {
  product?: ProductCategory;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly seo: SeoService,
    private readonly catalog: ProductCatalogService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const seoPath = params.get('seoPath') ?? '';
      this.catalog.bySeoPath(seoPath).subscribe((product) => {
        this.product = product;
        if (!product) {
          void this.router.navigateByUrl('/products');
          return;
        }
        this.seo.set(`${product.name} Exporter India | KVS Global Exim`, product.summary);
      });
    });
  }
}
