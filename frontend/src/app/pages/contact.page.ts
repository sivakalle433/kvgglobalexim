import { Component, OnInit } from '@angular/core';
import { SeoService } from '../core/seo.service';
import { SITE, whatsappUrl } from '../core/site';
import { EnquiryFormComponent } from '../shared/enquiry-form.component';

@Component({
  selector: 'app-contact-page',
  imports: [EnquiryFormComponent],
  templateUrl: './contact.page.html',
})
export class ContactPage implements OnInit {
  readonly site = SITE;
  readonly whatsapp = whatsappUrl();

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.set(
      'Contact / Request a Quote | KVS Global Exim',
      'Send a buyer enquiry to KVS Global Exim for Indian millets, spices, fruits, vegetables and pulses.',
    );
  }
}
