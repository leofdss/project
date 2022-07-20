import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

import { delay, Observable, of } from 'rxjs';

type PlatformId = 'server' | 'browser';

@Injectable({
  providedIn: 'root',
})
export class BrowserStateInterceptor implements HttpInterceptor {
  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: PlatformId
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.platformId === 'server') {
      return next.handle(req);
    }

    const baseUrl = req.url.startsWith('/assets') ? '' : environment.baseUrl;

    const url = baseUrl + (req.url.startsWith('/') ? '' : '/') + req.url;

    const dupReq = req.clone({ url });

    if (req.method === 'GET') {
      const key = makeStateKey(req.url);
      const storedResponse = this.transferState.get<unknown>(key, null);
      if (storedResponse) {
        this.transferState.remove(key);
        const response = new HttpResponse({
          body: storedResponse,
          status: 200,
        });
        return of(response).pipe(delay(0));
      }
    }
    return next.handle(dupReq);
  }
}
