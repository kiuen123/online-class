import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from './../API/user-api.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private UserApiService: UserApiService,
    private _snackBar: MatSnackBar
  ) {}
  hide = true;
  bar = 'hide';
  model: any = { ten_dang_nhap: '', mat_khau: '' };
  user: any = JSON.parse(localStorage.getItem('user') || '{}');

  ngOnInit(): void {}

  login() {
    if (!this.validate()) {
      return;
    }

    if (this.model.ten_dang_nhap == '' || this.model.mat_khau == '') {
      this.openSnackBar(
        'Tên đăng nhập hoặc mật khẩu không được để trống',
        'Đóng'
      );
      return;
    }
    const data = {
      ten_dang_nhap: this.model.ten_dang_nhap,
      mat_khau: this.model.mat_khau,
    };
    this.UserApiService.checkLogin(data).subscribe(() => {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
      if (this.user.length == 0) {
        // không đăng nhập được
        this.openSnackBar('Tên đăng nhập hoặc mật khẩu không đúng', 'Đóng');
      } else {
        // đăng nhạp thành công
        this.router.navigate(['/main']);
      }
    });
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(data: string, act: string) {
    this._snackBar.open(data, act, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  validate(): boolean {
    if (this.model.ten_dang_nhap == undefined) {
      return false;
    } else if (this.model.mat_khau == undefined) {
      return false;
    } else return true;
  }
}
