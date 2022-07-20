import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { defaultLang, LanguageType } from '@project/api-interfaces';

@Component({
  selector: 'project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.addLangs(
      Object.entries(LanguageType).map((e) => e[1])
    );
    this.translateService.setDefaultLang(defaultLang);
  }
}
