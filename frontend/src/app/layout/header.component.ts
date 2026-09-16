import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SITE, whatsappUrl } from '../core/site';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly site = SITE;
  readonly whatsapp = whatsappUrl();
  menuOpen = false;

  readonly links = [
    { path: '/', label: 'Home' },
    { path: '/about-us', label: 'About Us' },
    { path: '/products', label: 'Products' },
    { path: '/quality-and-packaging', label: 'Quality & Packaging' },
    { path: '/export-markets', label: 'Export Markets' },
    { path: '/contact-us', label: 'Contact Us' },
  ];

  constructor(router: Router) {
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.menuOpen = false;
    });
  }
}
