import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PRODUCT_CATEGORIES, ProductCategory } from '../data/catalog';
import { mapCatalogPayload } from '../data/sheet-catalog';
import { SITE } from './site';

@Injectable({ providedIn: 'root' })
export class ProductCatalogService {
  private readonly catalog$: Observable<ProductCategory[]>;

  constructor() {
    this.catalog$ = from(this.load()).pipe(
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

  private async load(): Promise<ProductCategory[]> {
    if (!SITE.appsScriptUrl) {
      return [];
    }
    try {
      const res = await fetch(SITE.appsScriptUrl, { method: 'GET', redirect: 'follow' });
      const text = await res.text();
      return mapCatalogPayload(JSON.parse(text) as unknown);
    } catch {
      return [];
    }
  }
}
