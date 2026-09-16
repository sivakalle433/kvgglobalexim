import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';
import { REGIONS } from '../data/catalog';

@Component({
  selector: 'app-markets-page',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="container">
        <p class="crumb">Home / Export Markets</p>
        <h1>From India to the World</h1>
        <p class="lede">We present broad regions first. Named countries will be added as actual markets are established.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="region-grid region-grid-light">
          @for (region of regions; track region) {
            <article>{{ region }}</article>
          }
        </div>
        <p class="muted" style="margin-top: 1.5rem">
          Destination-port, labelling and phytosanitary needs are reviewed on each enquiry. No country-count or “global
          leader” claims are made here.
        </p>
        <a class="btn btn-primary" routerLink="/contact-us">Request a Quote</a>
      </div>
    </section>
  `,
})
export class MarketsPage implements OnInit {
  readonly regions = REGIONS;

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.set(
      'Export Markets | KVS Global Exim',
      'KVS Global Exim serves buyers in the Middle East, Asia, Africa and Europe as programmes are established.',
    );
  }
}
