import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs';
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
    const exlink = '/api/CheckLogin/CheckLogin';
    return this.http
      .post(this.link + exlink, data, {
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
    const exlink = '/api/User/GetAllUser';
    return this.http
      .get(this.link + exlink, {
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

  getAllTeacher() {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const exlink = '/api/User/GetAllTeacher';
    return this.http
      .get(this.link + exlink, {
        headers: headers,
      })
      .pipe(
        map((res: any) => {
          sessionStorage.setItem('teacherlist', JSON.stringify(res));
          return res;
        }),
        catchError((err) => {
          return err;
        })
      );
  }

  getUserbyId = (id: any) => {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    const exlink = '/api/User/GetUserbyId?id=' + id;
    return this.http
      .get(this.link + exlink, {
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
    const exlink = '/api/User/UpdateUserbyId';
    return this.http
      .patch(this.link + exlink, cruser, {
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
    const exlink = '/api/User/DeleteUserbyId?id=' + id;
    return this.http
      .delete(this.link + exlink, {
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
    const exlink = '/api/User/AddUser';
    return this.http
      .put(this.link + exlink, user, {
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
    const exlink = '/api/CheckLogin/CheckUsername?username=' + username;
    return this.http
      .get(this.link + exlink, {
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
    const exlink = '/api/CheckLogin/CheckEmail?email=' + email;
    return this.http
      .get(this.link + exlink, {
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
    const exlink =
      '/api/User/SearchUser?colum=' +
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
          sessionStorage.setItem('searchuserresults', JSON.stringify(res));
          return res;
        }),
        catchError((err) => {
          return err;
        })
      );
  };
}
