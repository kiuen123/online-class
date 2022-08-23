import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlApiService {
  constructor() {}

  getUrlApiDatabse(): string {
    let filePath: string = '../../assets/url-api.json';
    let result: any;
    var rawFile = new XMLHttpRequest();
    rawFile.open('GET', filePath, false);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          result = JSON.parse(rawFile.responseText).db;
        }
      }
    };
    rawFile.send(null);
    return result;
  }

  getUrlApiDevice(): string {
    let filePath: string = './../assets/url-api.json';
    let result: any;
    var rawFile = new XMLHttpRequest();
    rawFile.open('GET', filePath, false);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          result = JSON.parse(rawFile.responseText).dv;
        }
      }
    };
    rawFile.send(null);
    return result;
  }
}
