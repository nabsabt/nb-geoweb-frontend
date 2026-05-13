import { Component, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'skills-section',
  templateUrl: './skills.section.html',
  styleUrl: './skills.section.scss',
  imports: [TranslateModule, MatExpansionModule],
})
export class SkillsSection {
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }

  public frontendPanelOpen = signal<boolean>(false);
  public backendPanelOpen = signal<boolean>(false);
  public toolsPanelOpen = signal<boolean>(false);
}
