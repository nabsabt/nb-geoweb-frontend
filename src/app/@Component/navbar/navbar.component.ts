import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  providers: [TranslateService],
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbarSupportedContent') navbarSupportedContent: ElementRef;

  public changeToLangValue: string;

  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }
  ngOnInit(): void {
    this.changeToLangValue =
      this.translateService.currentLang === 'en' ? 'hu' : 'en';
  }

  public collapseNavbar() {
    const navbar = this.navbarSupportedContent.nativeElement;
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }

  changeLanguage() {
    this.translateService.currentLang === 'en'
      ? this.translateService.use('hu')
      : this.translateService.use('en');
    this.changeToLangValue =
      this.translateService.currentLang === 'en' ? 'hu' : 'en';
  }
}
