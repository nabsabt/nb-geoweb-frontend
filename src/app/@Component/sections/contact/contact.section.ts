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
import { Observable, Subscription } from 'rxjs';
import { FeedbackMailService } from '../../../@Service/mail.service';

@Component({
  selector: 'contact-section',
  templateUrl: './contact.section.html',
  styleUrl: './contact.section.scss',
  imports: [
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class ContactSection implements OnDestroy {
  private SendMailSub: Subscription;

  private mailservice = inject(FeedbackMailService);
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }

  public isLoading = signal<boolean>(false);
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
    } catch (error) {
      alert(
        this.translateService.currentLang === 'hu'
          ? 'Hiba történt az üzenet küldésekor! Kérem, próbálkozzon később!'
          : 'Some error occured during message processing. Please, try again later!',
      );
      this.isLoading.set(false);
    } finally {
      alert(
        this.translateService.currentLang === 'hu'
          ? 'Üzenet elküldve! Köszönöm érdeklődését, hamarosan visszajelzek!'
          : 'Message sent! Thank you for contacting me, I will reply soon!',
      );
      this.form.reset();
      this.isLoading.set(false);
    }
    return;
  }

  ngOnDestroy(): void {
    this.SendMailSub?.unsubscribe();
  }
}
function toSignal(arg0: Observable<unknown>, arg1: { initialValue: 'EN' }) {
  throw new Error('Function not implemented.');
}
