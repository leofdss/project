import { NgModule, Provider } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
  TransferState,
} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { registerLocaleData } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localePt from '@angular/common/locales/pt';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';

import { translateBrowserLoaderFactory } from './core/providers/translate-browser.loader';
import { AppReducer } from './core/store/app.reducer';
import { AppEffects } from './core/store/app.effects';
import { BrowserStateInterceptor } from './core/providers/browser-state-interceptor';

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
  declarations: [AppComponent],
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
    StoreModule.forRoot({
      appState: AppReducer,
    }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [BrowserStateProvider, SanityChecks, Appearance],
  bootstrap: [AppComponent],
})
export class AppModule {}
