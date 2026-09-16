import { Routes } from '@angular/router';
import { AboutPage } from './pages/about.page';
import { ContactPage } from './pages/contact.page';
import { HomePage } from './pages/home.page';
import { LegalPage } from './pages/legal.page';
import { MarketsPage } from './pages/markets.page';
import { ProductDetailPage } from './pages/product-detail.page';
import { ProductsPage } from './pages/products.page';
import { QualityPage } from './pages/quality.page';

export const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full' },
  { path: 'about-us', component: AboutPage },
  { path: 'products', component: ProductsPage },
  { path: 'quality-and-packaging', component: QualityPage },
  { path: 'export-markets', component: MarketsPage },
  { path: 'contact-us', component: ContactPage },
  { path: 'privacy-policy', component: LegalPage, data: { kind: 'privacy' } },
  { path: 'terms-and-conditions', component: LegalPage, data: { kind: 'terms' } },
  { path: ':seoPath', component: ProductDetailPage },
];
