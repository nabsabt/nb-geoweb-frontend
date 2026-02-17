import { Component, inject, OnDestroy, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';
import { FeedbackMailService } from '../../../@Service/mail.service';

@Component({
  selector: 'contact-section',
  templateUrl: './contact.section.html',
  styleUrl: './contact.section.scss',
  imports: [
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
})
export class ContactSection implements OnDestroy {
  private SendMailSub: Subscription;

  private mailservice = inject(FeedbackMailService);
  constructor(
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
  ) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }

  public isLoading = signal<boolean>(false);
  public isMessageSent = signal<boolean>(false);

  public form = new FormGroup({
    name: new FormControl({ value: '', disabled: this.isLoading() }, [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl({ value: '', disabled: this.isLoading() }, [
      Validators.required,
      Validators.email,
    ]),
    message: new FormControl({ value: '', disabled: this.isLoading() }, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  get message() {
    return this.form.get('message');
  }
  get email() {
    return this.form.get('email');
  }
  get name() {
    return this.form.get('name');
  }

  public async onSubmitMessage() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    try {
      const { message, email, name } = this.form.value;
      await this.mailservice.send(message!, email!, name!);
      this.snackBar.open(
        this.translateService.currentLang === 'hu'
          ? 'Üzenet elküldve! Köszönöm érdeklődését, hamarosan visszajelzek!'
          : 'Message sent! Thank you for contacting me, I will reply soon!',
        '',
        { duration: 5000, panelClass: 'snackbar-success' },
      );
      this.form.reset();
      this.isMessageSent.set(true);
      this.isLoading.set(false);
    } catch (error) {
      this.snackBar.open(
        this.translateService.currentLang === 'hu'
          ? 'Hiba történt az üzenet küldésekor! Kérem, próbálkozzon később!'
          : 'Some error occured during message processing. Please, try again later!',
        '',
        { duration: 5000, panelClass: 'snackbar-error' },
      );
      this.isLoading.set(false);
      this.form.reset();
    }
    return;
  }

  ngOnDestroy(): void {
    this.SendMailSub?.unsubscribe();
  }
}
