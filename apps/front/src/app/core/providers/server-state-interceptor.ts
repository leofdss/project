import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';

import { REQUEST } from '@nguniversal/express-engine/tokens';
import { environment } from '../../../environments/environment.prod';

import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerStateInterceptor implements HttpInterceptor {
  constructor(
    private transferState: TransferState,
    @Inject(REQUEST) private request: Request
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const cookies = this.parseCookie(this.request.headers['cookie']);

    const baseUrl = req.url.startsWith('/assets') ? '' : environment.baseUrl;
    const domain = this.domain();

    const url =
      domain.api + baseUrl + (req.url.startsWith('/') ? '' : '/') + req.url;

    const dupReq = req.clone({
      url,
      headers: new HttpHeaders({
        authorization: cookies['token'] ?? '',
        'host-front': domain.front,
      }),
    });

    if (req.method === 'GET') {
      return next.handle(dupReq).pipe(
        tap((event: HttpEvent<unknown>) => {
          if (
            event instanceof HttpResponse &&
            (event.status === 200 || event.status === 202)
          ) {
            this.transferState.set(makeStateKey(req.url), event.body);
          }
        })
      );
    }

    return next.handle(dupReq);
  }

  private domain(): { api: string; front: string } {
    const getUrl = this.getUrl();
    return {
      front: getUrl.protocol + '://' + getUrl.host,
      api: process?.env?.['API_URL'] ?? getUrl.protocol + '://' + getUrl.host,
    };
  }

  getUrl(): { host: string; protocol: 'http' | 'https' } {
    return {
      host: this.request.get('x-forwarded-host') ?? '',
      protocol:
        (this.request.get('x-forwarded-proto') as 'http' | 'https') ?? 'http',
    };
  }

  parseCookie(str: string | undefined): Record<string, string> {
    if (str) {
      return str
        .split(';')
        .map((v) => v.split('='))
        .reduce((acc: Record<string, string>, v) => {
          acc[decodeURIComponent((v[0] ?? '').trim())] = decodeURIComponent(
            (v[1] ?? '').trim()
          );
          return acc;
        }, {});
    } else {
      return {};
    }
  }
}
