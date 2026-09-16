import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'app-about-page',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="container">
        <p class="crumb">Home / About Us</p>
        <h1>KVS Global Exim</h1>
        <p class="lede">A professional and credible India-based agricultural export partner for international buyers.</p>
      </div>
    </section>
    <section class="section">
      <div class="container prose-page">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80"
          alt="Farm landscape used to illustrate agricultural sourcing"
        />
        <p>
          KVS Global Exim sources and exports Indian agricultural products for buyers who need a clear, documented trading
          process. The company is positioned as a reliable counterpart for millets, spices, fruits, vegetables and pulses —
          not as a volume-claim brand.
        </p>
        <p>
          We do not publish unverified figures for years in business, number of countries or number of clients. As actual
          shipments, destinations and certifications are established, those facts can be added to this page.
        </p>
        <h2>How we work</h2>
        <p>
          Enquiries are reviewed against product availability, packing capability and destination requirements. Where a
          specification can be met, we coordinate sourcing, quality checks, export packing and shipping documents.
        </p>
        <a class="btn btn-primary" routerLink="/contact-us">Request a Quote</a>
      </div>
    </section>
  `,
})
export class AboutPage implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.set(
      'About Us | KVS Global Exim',
      'Learn how KVS Global Exim works with international buyers of Indian agricultural products.',
    );
  }
}
