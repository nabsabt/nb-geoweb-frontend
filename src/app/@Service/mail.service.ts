import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FeedbackMailService {
  constructor(private http: HttpClient) {}

  async send(
    message: string,
    fromEmail?: string,
    fromName?: string,
  ): Promise<void> {
    const emailJSparams = {
      publicKey: 'nRmMqMX6tFgKJVQE8',
      serviceId: 'service_224zkhh',
      templateId: 'template_173796l',
    };
    const trimmed = message?.trim();
    if (!trimmed) throw new Error('Message is empty');

    const params = {
      message: trimmed,
      from_email: fromEmail?.trim() || 'anonymous',
      from_name: fromName?.trim() || 'anonymous',
      sent_at: new Date().toISOString(),
    };

    await emailjs.send(
      emailJSparams.serviceId,
      emailJSparams.templateId,
      params,
      {
        publicKey: emailJSparams.publicKey,
      },
    );
  }
}
