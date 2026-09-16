import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { SITE } from './site';

export interface EnquiryPayload {
  name: string;
  company: string;
  email: string;
  country: string;
  phone: string;
  product: string;
  quantity: string;
  destinationPort: string;
  packagingRequirement: string;
  message: string;
  website: string;
}

@Injectable({ providedIn: 'root' })
export class EnquiryService {
  submit(payload: EnquiryPayload): Observable<{ status: string }> {
    if (payload.website?.trim()) {
      return of({ status: 'received' });
    }
    if (SITE.appsScriptUrl) {
      return from(this.postScript(payload));
    }
    return from(this.postFormSubmit(payload));
  }

  private async postFormSubmit(payload: EnquiryPayload): Promise<{ status: string }> {
    const res = await fetch(`https://formsubmit.co/ajax/${SITE.enquiryNotifyEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        company: payload.company || '—',
        email: payload.email,
        _replyto: payload.email,
        country: payload.country,
        phone: payload.phone || '—',
        product: payload.product || '—',
        quantity: payload.quantity || '—',
        destination_port: payload.destinationPort || '—',
        packaging: payload.packagingRequirement || '—',
        message: payload.message || '—',
        _subject: 'New buyer enquiry — KVS Global Exim',
        _template: 'table',
        _captcha: 'false',
      }),
    });
    const data = await this.readJson(res);
    if (!res.ok || data['success'] === 'false' || data['success'] === false) {
      throw new Error(String(data['message'] || 'The enquiry email could not be sent.'));
    }
    return { status: 'received' };
  }

  private async postScript(payload: EnquiryPayload): Promise<{ status: string }> {
    const res = await fetch(SITE.appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
    const data = await this.readJson(res);
    if (!res.ok || data['status'] === 'error') {
      throw new Error(String(data['message'] || 'The enquiry could not be sent.'));
    }
    return { status: 'received' };
  }

  private async readJson(res: Response): Promise<Record<string, unknown>> {
    const text = await res.text();
    try {
      return JSON.parse(text) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
}
