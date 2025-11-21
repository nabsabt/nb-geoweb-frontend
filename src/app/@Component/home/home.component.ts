import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
})
export class HomeComponent implements OnInit {
  public subtitleText = signal<string[]>(['']);

  constructor(
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute
  ) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }
  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) this.jumpToSection(fragment);
    });
  }

  public jumpToSection(section: string): void {
    const element = document.getElementById(section);
    console.log(element, section);
    if (element) {
      const yOffset = window.innerWidth < 701 ? 75 + 10 : 100 + 10; // Adjust offset for mobile view
      const y =
        element.getBoundingClientRect().top + window.pageYOffset - yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  public navigateToExternalPage(url: string) {
    window.open(url, '_blank');
  }

  public onSubmitMessage(form: NgForm) {}
}
