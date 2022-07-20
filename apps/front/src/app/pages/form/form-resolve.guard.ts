import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { validate } from 'uuid';

import { AppService } from '../../core/services/app.service';

@Injectable()
export class FormResolverGuard {
  constructor(private appService: AppService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const ref: string | undefined = route.params?.['uuid'];
    if (ref && validate(ref)) {
      return this.appService.getOne(ref).pipe(
        map((result) => result),
        catchError(() => of(null))
      );
    }
    return null;
  }
}
