import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'app-quality-page',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="container">
        <p class="crumb">Home / Quality &amp; Packaging</p>
        <h1>Export packing that follows the buyer’s instruction</h1>
        <p class="lede">Cleaning, grading, packing and marking are agreed before a lot is released for shipment.</p>
      </div>
    </section>
    <section class="section">
      <div class="container prose-page">
        <h2>Quality</h2>
        <p>
          Quality checks follow the specification captured at enquiry: moisture, size, colour, admixture, packing style and
          any destination testing the buyer names. We do not display laboratory or certification badges until those
          registrations are held and applicable.
        </p>
        <h2>Packaging</h2>
        <ul>
          <li>Food-grade bags and cartons in standard export weights</li>
          <li>Buyer-specified retail or private-label packing where feasible</li>
          <li>Marking, lot codes and palletisation as instructed</li>
        </ul>
        <h2>Documentation</h2>
        <p>
          Commercial invoice, packing list, bill of lading and supporting certificates are prepared for the agreed Incoterms
          and destination authority.
        </p>
        <a class="btn btn-primary" routerLink="/contact-us">Request a Quote</a>
      </div>
    </section>
  `,
})
export class QualityPage implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.set(
      'Quality & Packaging | KVS Global Exim',
      'Export packing, grading and documentation support for Indian agricultural shipments.',
    );
  }
}
