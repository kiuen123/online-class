import { Component, Inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserApiService } from '../../API/user-api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';

// user list interface
export interface UserIntefce {
  id?: string;
  ten?: string;
  email?: string;
  vai_tro?: string;
  anh_dai_dien?: string;
  tom_tat?: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private UserApiService: UserApiService,
    public dialog: MatDialog
  ) {}

  // tên các cột
  displayedColumns: string[] = [
    'id',
    'ten',
    'email',
    'vai_tro',
    'tom_tat',
    'action',
  ];
  userlist: UserIntefce[] = JSON.parse(
    sessionStorage.getItem('userlist') || '[]'
  );
  userpage: UserIntefce[] = [];
  
  // data của bảng
  dataSource = this.userpage;

  // thông tin của page
  curentPage = 0;
  pagelength = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[1];

  ngOnInit(): void {
    this.getall();
    this.searchUser(
      this.searchof,
      this.content,
      this.curentPage,
      this.pageSize
    );
  }

  getall() {
    this.UserApiService.getAllUser().subscribe(() => {
      this.userlist = JSON.parse(sessionStorage.getItem('userlist') || '{}');
      this.pagelength = this.userlist.length;
    });
  }

  // page control
  onChangePage(pe: PageEvent) {
    this.curentPage = pe.pageIndex;
    this.pageSize = pe.pageSize;
    this.searchUser(
      this.searchof,
      this.content,
      this.curentPage,
      this.pageSize
    );
  }

  updateuser(cruser: UserIntefce) {
    const dialogRef = this.dialog.open(UserUpdate, {
      width: '600px',
      data: cruser,
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  deleteuser(cruser: UserIntefce) {
    const dialogRef = this.dialog.open(UserDelete, {
      width: '600px',
      data: cruser,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.searchUser(
        this.searchof,
        this.content,
        this.curentPage,
        this.pageSize
      );
    });
  }

  adduser() {
    const dialogRef = this.dialog.open(UserAdd, {
      width: '600px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.searchUser(
        this.searchof,
        this.content,
        this.curentPage,
        this.pageSize
      );
    });
  }

  // search
  options = ['id', 'ten', 'email', 'vai_tro', 'tom_tat'];
  searchof: string = this.options[0];
  content: string = '';
  searchUser(
    colum: string,
    content: string,
    CurentPage: number,
    PageLength: number
  ) {
    if (content == '') {
      content = '%';
    }
    this.UserApiService.searchUser(
      colum,
      content,
      CurentPage,
      PageLength
    ).subscribe(() => {
      this.userpage = JSON.parse(
        sessionStorage.getItem('searchuserresults') || '{}'
      );
      this.dataSource = this.userpage;
    });
  }
}

// update user info component
@Component({
  selector: 'user-update',
  templateUrl: 'user-update.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserUpdate {
  constructor(
    public dialogRef: MatDialogRef<UserUpdate>,
    private UserApiService: UserApiService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: UserIntefce
  ) {}

  cruser: any = this.data;

  ngOnInit(): void {}

  onNoClick(): void {
    this.openSnackBar('Hủy chỉnh sửa', 'Đóng');
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.UserApiService.updateUser(this.cruser).subscribe((res: any) => {
      if (res == false) {
        this.openSnackBar('Chỉnh sửa thành công', 'Đóng');
        this.dialogRef.close();
      } else this.openSnackBar(res, 'Đóng');
    });
  }

  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(data: string, act: string) {
    this._snackBar.open(data, act, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}

// delete user info component
@Component({
  selector: 'user-delete',
  templateUrl: 'user-delete.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserDelete {
  constructor(
    public dialogRef: MatDialogRef<UserDelete>,
    private UserApiService: UserApiService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: UserIntefce
  ) {}

  cruser: any = this.data;

  ngOnInit(): void {}

  onNoClick(): void {
    this.openSnackBar('Hủy xóa', 'Đóng');
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.UserApiService.deleteUser(this.cruser.id).subscribe((res: any) => {
      if (res == false) {
        this.openSnackBar('Xóa thành công', 'Đóng');
        this.dialogRef.close();
      } else this.openSnackBar(res, 'Đóng');
    });
  }

  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(data: string, act: string) {
    this._snackBar.open(data, act, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}

// add user info component
@Component({
  selector: 'user-add',
  templateUrl: 'user-add.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserAdd {
  constructor(
    public dialogRef: MatDialogRef<UserAdd>,
    private UserApiService: UserApiService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: UserIntefce
  ) {}

  cruser: any = {
    id: '0',
    ten_dang_nhap: '',
    mat_khau: '',
    ten: '',
    email: '',
    vai_tro: '',
    anh_dai_dien: '',
    tom_tat: '',
  };
  hide = true;
  valid = true;
  ngOnInit(): void {}

  onNoClick(): void {
    this.openSnackBar('Hủy chỉnh sửa', 'Đóng');
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.cruser.vai_tro = this.floatLabelControl.value;
    if (
      this.cruser.ten_dang_nhap == '' ||
      this.cruser.mat_khau == '' ||
      this.cruser.ten == '' ||
      this.cruser.email == '' ||
      this.cruser.vai_tro == ''
    ) {
      this.openSnackBar('Hãy bổ sung thông tin', 'Đóng');
    } else {
      if (this.valid == false) {
        this.openSnackBar('Hãy sửa lại thông tin', 'Đóng');
      } else {
        this.UserApiService.addUser(this.cruser).subscribe((res: any) => {
          if (res == false) {
            this.openSnackBar('Thêm thành công', 'Đóng');
            this.dialogRef.close();
          } else this.openSnackBar(res, 'Đóng');
        });
      }
    }
  }

  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(data: string, act: string) {
    this._snackBar.open(data, act, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

  checkusername(username: string) {
    this.UserApiService.checkUsername(username).subscribe((res) => {
      if (res.length > 0) {
        this.openSnackBar('Tên đăng nhập đã tồn tại', 'Đóng');
        this.valid = false;
      }
    });
  }

  checkemail(email: string) {
    this.UserApiService.checkEmail(email).subscribe((res) => {
      if (res.length > 0) {
        this.openSnackBar('Email đã tồn tại', 'Đóng');
        this.valid = false;
      }
    });
  }

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('student' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
}
