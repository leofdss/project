import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item, Resp } from '@project/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  save(item: Item): Observable<Item> {
    if (item.uuid) {
      return this.http.put<Item>('', item);
    }
    return this.http.post<Item>('', item);
  }

  list(search: string): Observable<Item[]> {
    return this.http.get<Item[]>('', {
      params: new HttpParams({ fromObject: { search } }),
    });
  }

  delete(uuid: string): Observable<Resp> {
    return this.http.delete<Resp>('/' + uuid);
  }
}
