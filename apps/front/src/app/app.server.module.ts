import { NgModule, Provider } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TransferState } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ServerStateInterceptor } from './core/providers/server-state-interceptor';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { translateServerLoaderFactory } from './core/providers/translate-server.loader';

export const ServerStateProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ServerStateInterceptor,
  multi: true,
};

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState],
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [ServerStateProvider],
})
export class AppServerModule {}
