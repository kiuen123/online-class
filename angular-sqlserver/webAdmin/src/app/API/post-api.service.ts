import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs';
import { UrlApiService } from './url-api.service';
export interface Post {
  id_tacgia?: number;
  id_course?: number;
  title?: string;
  content?: string;
  created_at?: string;
  update_at?: string;
}
@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  constructor(private http: HttpClient, private UrlApiService: UrlApiService) {}

  link = this.UrlApiService.getUrlApiDatabse();

  GetAllPostbyCourseId = (courseId: number) => {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const exlink = '/api/Post/GetAllPostbyCourseId?courseId=' + courseId;
    return this.http
      .get(this.link + exlink, {
        headers: headers,
      })
      .pipe(
        map((res: any) => {
          localStorage.setItem('postlist', JSON.stringify(res));
          return res;
        }),
        catchError((err) => {
          return err;
        })
      );
  };

  AddPost = (post: Post) => {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const exlink = '/api/Post/AddPost';
    return this.http
      .post(this.link + exlink, post, {
        headers: headers,
      })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err) => {
          return err;
        })
      );
  };
}
