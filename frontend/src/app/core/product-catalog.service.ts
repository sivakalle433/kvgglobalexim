import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { PRODUCT_CATEGORIES, ProductCategory } from '../data/catalog';
import { mapCatalogPayload } from '../data/sheet-catalog';
import { SITE } from './site';

@Injectable({ providedIn: 'root' })
export class ProductCatalogService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly catalog$: Observable<ProductCategory[]>;

  constructor() {
    if (!isPlatformBrowser(this.platformId) || !SITE.appsScriptUrl) {
      this.catalog$ = of(PRODUCT_CATEGORIES);
      return;
    }
    this.catalog$ = this.http.get<unknown>(SITE.appsScriptUrl).pipe(
      map((data) => mapCatalogPayload(data)),
      catchError(() => of([] as ProductCategory[])),
      map((items) => (items.length > 0 ? items : PRODUCT_CATEGORIES)),
      shareReplay(1),
    );
  }

  list(): Observable<ProductCategory[]> {
    return this.catalog$;
  }

  bySeoPath(seoPath: string): Observable<ProductCategory | undefined> {
    return this.list().pipe(map((items) => items.find((item) => item.seoPath === seoPath)));
  }
}
