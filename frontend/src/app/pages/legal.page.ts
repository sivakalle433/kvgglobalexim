import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../core/seo.service';
import { SITE } from '../core/site';

@Component({
  selector: 'app-legal-page',
  template: `
    <section class="page-hero">
      <div class="container">
        <p class="crumb">Home / Legal</p>
        <h1>{{ heading }}</h1>
      </div>
    </section>
    <section class="section">
      <div class="container prose-page">
        @if (kind === 'privacy') {
          <p>
            This website collects buyer enquiry details that you submit (name, company, email, country, phone, product and
            message). Those details are used only to respond to your request. They are stored by KVS Global Exim and are not
            sold.
          </p>
          <p>
            Analytics may be added after domain launch. Contact {{ email }} to ask about stored enquiry data.
          </p>
        } @else {
          <p>
            Content on this website is for general information about agricultural export services. Product availability,
            packing and prices are confirmed only after a written offer. No statement on this site should be read as a
            guarantee of volume, certification or destination access unless confirmed in a contract.
          </p>
          <p>Replace this page with counsel-reviewed terms before public launch if required.</p>
        }
      </div>
    </section>
  `,
})
export class LegalPage implements OnInit {
  kind: 'privacy' | 'terms' = 'privacy';
  heading = 'Privacy Policy';
  readonly email = SITE.email;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.kind = this.route.snapshot.data['kind'] === 'terms' ? 'terms' : 'privacy';
    this.heading = this.kind === 'terms' ? 'Terms & Conditions' : 'Privacy Policy';
    this.seo.set(`${this.heading} | KVS Global Exim`, `${this.heading} for the KVS Global Exim website.`);
  }
}
