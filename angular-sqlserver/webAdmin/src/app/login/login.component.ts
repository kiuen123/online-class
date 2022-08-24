import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, isEmpty } from 'rxjs';
import { UserApiService } from './../API/user-api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private UserApiService: UserApiService) {}
  hide = true;
  bar = 'hide';
  model: any = {};
  user: any = JSON.parse(sessionStorage.getItem('user') || '{}');

  login() {
    const data = {
      ten_dang_nhap: this.model.username,
      mat_khau: this.model.password,
    };
    this.UserApiService.checkLogin(data).subscribe(() => {
      this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
      if (this.user.length == 0) {
        // không đăng nhập được
      } else {
        // đăng nhạp thành công
        this.router.navigate(['/main']);
      }
    });
  }
  ngOnInit(): void {}
}
