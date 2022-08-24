import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, observable, isEmpty } from 'rxjs';
import { UrlApiService } from './url-api.service';
@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient, private UrlApiService: UrlApiService) {}

  link = this.UrlApiService.getUrlApiDatabse();

  checkLogin = (data: any) => {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const userlink = '/api/CheckLogin/CheckLogin';
    return this.http
      .post(this.link + userlink, data, {
        headers: headers,
      })
      .pipe(
        map((res: any) => {
          sessionStorage.setItem('user', JSON.stringify(res));
          return res;
        }),
        catchError((err) => {
          return err;
        })
      );
  };
}
