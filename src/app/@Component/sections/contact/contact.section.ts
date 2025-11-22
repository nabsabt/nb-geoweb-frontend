import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'contact-section',
  templateUrl: './contact.section.html',
  styleUrl: './contact.section.scss',
  imports: [TranslateModule, MatFormFieldModule, MatInputModule, FormsModule],
})
export class ContactSection {
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }

  public onSubmitMessage(form: NgForm) {}
}
