import { NgModule, Provider } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
  TransferState,
} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserStateInterceptor } from './core/providers/browser-state-interceptor';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { registerLocaleData } from '@angular/common';

import { Action, ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';

import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localePt from '@angular/common/locales/pt';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateBrowserLoaderFactory } from './core/providers/translate-browser.loader';

export const BrowserStateProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: BrowserStateInterceptor,
  multi: true,
};

export const SanityChecks: Provider = {
  provide: MATERIAL_SANITY_CHECKS,
  useValue: false,
};

export const Appearance: Provider = {
  provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
  useValue: { appearance: 'outline' },
};

registerLocaleData(localePt);
registerLocaleData(localeEs);
registerLocaleData(localeEn);

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    BrowserTransferStateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState],
      },
    }),
  ],
  providers: [BrowserStateProvider, SanityChecks, Appearance],
  bootstrap: [AppComponent],
})
export class AppModule {}
