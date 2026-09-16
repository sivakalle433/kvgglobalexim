import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { whatsappUrl } from './core/site';
import { FooterComponent } from './layout/footer.component';
import { HeaderComponent } from './layout/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer />
    <a class="whatsapp-fab" [href]="whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      WhatsApp
    </a>
  `,
})
export class AppComponent {
  readonly whatsapp = whatsappUrl();
}
