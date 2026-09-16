import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductImage } from '../data/catalog';

@Component({
  selector: 'app-product-slideshow',
  template: `
    <div
      class="product-slideshow"
      [class.is-detail]="variant === 'detail'"
      [class.is-empty]="images.length === 0"
      (mouseenter)="pause()"
      (mouseleave)="resume()"
    >
      @if (images.length === 0) {
        <div class="slideshow-placeholder" aria-hidden="true"></div>
      } @else {
        <div class="slideshow-track" [style.transform]="'translate3d(-' + index * 100 + '%, 0, 0)'">
          @for (img of images; track img.src) {
            <img [src]="img.src" [alt]="img.alt" width="640" height="400" />
          }
        </div>
      }
      @if (images.length > 1) {
        <div class="slideshow-dots" role="tablist" aria-label="Product photos">
          @for (img of images; track img.src; let i = $index) {
            <button
              type="button"
              [class.active]="i === index"
              [attr.aria-label]="'Show photo ' + (i + 1)"
              (click)="go(i)"
            ></button>
          }
        </div>
      }
    </div>
  `,
})
export class ProductSlideshowComponent implements OnInit, OnDestroy {
  @Input({ required: true }) images: ProductImage[] = [];
  @Input() variant: 'card' | 'detail' = 'card';
  @Input() delay = 0;

  index = 0;
  private timer?: ReturnType<typeof setInterval>;
  private startTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.start();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  go(i: number): void {
    this.index = i;
    this.stop();
    this.start();
  }

  pause(): void {
    this.stop();
  }

  resume(): void {
    this.start();
  }

  private start(): void {
    if (this.images.length < 2 || this.prefersReducedMotion()) {
      return;
    }
    this.stop();
    this.startTimer = setTimeout(() => {
      this.timer = setInterval(() => {
        this.index = (this.index + 1) % this.images.length;
      }, 1800);
    }, this.delay);
  }

  private stop(): void {
    if (this.startTimer) {
      clearTimeout(this.startTimer);
      this.startTimer = undefined;
    }
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private prefersReducedMotion(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
