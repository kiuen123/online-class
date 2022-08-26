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

  getAllUser = () => {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const userlink = '/api/User/GetAllUser';
    return this.http
      .get(this.link + userlink, {
        headers: headers,
      })
      .pipe(
        map((res: any) => {
          sessionStorage.setItem('userlist', JSON.stringify(res));
          return res;
        }),
        catchError((err) => {
          return err;
        })
      );
  };

  getUserbyId = (id: any) => {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const userlink = '/api/User/GetUserbyId?id=' + id;
    return this.http
      .get(this.link + userlink, {
        headers: headers,
      })
      .pipe(
        map((res: any) => {
          sessionStorage.setItem('cruser', JSON.stringify(res));
          return res;
        }),
        catchError((err) => {
          return err;
        })
      );
  };

  updateUser = (cruser: any) => {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const userlink = '/api/User/UpdateUserbyId';
    return this.http
      .patch(this.link + userlink, cruser, {
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

  deleteUser = (id: any) => {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const userlink = '/api/User/DeleteUserbyId?id=' + id;
    return this.http
      .delete(this.link + userlink, {
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

  addUser = (user: any) => {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const userlink = '/api/User/AddUser';
    return this.http
      .put(this.link + userlink, user, {
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

  checkUsername = (username: any) => {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const userlink = '/api/CheckLogin/CheckUsername?username=' + username;
    return this.http
      .get(this.link + userlink, {
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

  checkEmail = (email: any) => {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const userlink = '/api/CheckLogin/CheckEmail?email=' + email;
    return this.http
      .get(this.link + userlink, {
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

  searchUser = (
    colum: string,
    content: string,
    CurentPage: number,
    PageLength: number
  ) => {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const userlink =
      '/api/User/SearchUser?colum=' +
      colum +
      '&content=' +
      content +
      '&CurentPage=' +
      CurentPage +
      '&PageLength=' +
      PageLength;
    return this.http
      .get(this.link + userlink, {
        headers: headers,
      })
      .pipe(
        map((res: any) => {
          sessionStorage.setItem('searchresults', JSON.stringify(res));
          return res;
        }),
        catchError((err) => {
          return err;
        })
      );
  };
}
