import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs';
import { UrlApiService } from './url-api.service';

@Injectable({
  providedIn: 'root',
})
export class CourseApiService {
  constructor(private http: HttpClient, private UrlApiService: UrlApiService) {}

  link = this.UrlApiService.getUrlApiDatabse();

  getAllCourse = () => {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const exlink = '/api/Course/GetAllCourse';
    return this.http
      .get(this.link + exlink, {
        headers: headers,
      })
      .pipe(
        map((res: any) => {
          sessionStorage.setItem('courselist', JSON.stringify(res));
          return res;
        }),
        catchError((err) => {
          return err;
        })
      );
  };

  searchCourse = (
    colum: string,
    content: string,
    CurentPage: number,
    PageLength: number
  ) => {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const exlink =
      '/api/Course/SearchCourse?colum=' +
      colum +
      '&content=' +
      content +
      '&CurentPage=' +
      CurentPage +
      '&PageLength=' +
      PageLength;
    return this.http
      .get(this.link + exlink, {
        headers: headers,
      })
      .pipe(
        map((res: any) => {
          sessionStorage.setItem('searchcourseresults', JSON.stringify(res));
          return res;
        }),
        catchError((err) => {
          return err;
        })
      );
  };
}
