import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnquiryService } from '../core/enquiry.service';
import { ProductCatalogService } from '../core/product-catalog.service';
import { COUNTRY_DIAL_CODES } from '../data/country-dial-codes';

@Component({
  selector: 'app-enquiry-form',
  imports: [ReactiveFormsModule],
  templateUrl: './enquiry-form.component.html',
})
export class EnquiryFormComponent implements OnInit {
  @Input() presetProduct = '';
  @Input() heading = 'Send an inquiry';
  @Input() hint = 'Include product, grade, quantity, packing and destination port.';

  productOptions: string[] = [];
  readonly dialCodes = COUNTRY_DIAL_CODES;
  submitting = false;
  submitted = false;
  error = '';

  private readonly fb = inject(FormBuilder);
  private readonly enquiryService = inject(EnquiryService);
  private readonly catalog = inject(ProductCatalogService);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    company: ['', Validators.maxLength(160)],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(160)]],
    country: ['', [Validators.required, Validators.maxLength(80)]],
    countryCode: ['IN'],
    phone: ['', Validators.maxLength(24)],
    product: [''],
    quantity: ['', Validators.maxLength(80)],
    destinationPort: ['', Validators.maxLength(120)],
    packagingRequirement: ['', Validators.maxLength(200)],
    message: ['', Validators.maxLength(4000)],
    website: [''],
  });

  ngOnInit(): void {
    if (this.presetProduct) {
      this.form.patchValue({ product: this.presetProduct });
    }
    this.catalog.list().subscribe((items) => {
      const names = items.map((item) => item.name.trim()).filter((name) => name.length > 0);
      if (names.length > 0) {
        this.productOptions = names;
      }
    });
  }

  invalid(control: 'name' | 'email' | 'country'): boolean {
    const field = this.form.controls[control];
    return field.invalid && field.touched;
  }

  submit(): void {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const value = this.form.getRawValue();
    const national = value.phone.trim();
    const dial = this.dialCodes.find((item) => item.iso === value.countryCode)?.dial ?? '+91';
    const phone = national ? `${dial} ${national}` : '';
    this.enquiryService.submit({
      name: value.name,
      company: value.company,
      email: value.email,
      country: value.country,
      phone,
      product: value.product,
      quantity: value.quantity,
      destinationPort: value.destinationPort,
      packagingRequirement: value.packagingRequirement,
      message: value.message,
      website: value.website,
    }).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
        this.form.reset({ countryCode: 'IN' });
        if (this.presetProduct) {
          this.form.patchValue({ product: this.presetProduct });
        }
      },
      error: (err: unknown) => {
        this.submitting = false;
        const message =
          err instanceof Error
            ? err.message
            : typeof err === 'object' && err && 'error' in err
              ? String((err as { error?: { message?: string } }).error?.message || '')
              : '';
        this.error =
          message.length > 0
            ? message
            : 'The enquiry could not be sent. Please email us directly or try again.';
      },
    });
  }
}
