import { Component, Inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CourseApiService } from '../../API/course-api.service';
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

// course list interface
export interface CourseIntefce {
  id_course?: string;
  ten_lop?: string;
  ngay_bat_dau?: string;
  ngay_ket_thuc?: string;
  link_online?: string;
  giao_vien?: string;
  so_thanh_vien?: string;
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  constructor(
    private CourseApiService: CourseApiService,
    public dialog: MatDialog
  ) {}

  // tên các cột
  displayedColumns: string[] = [
    'id_course',
    'ten_lop',
    'ngay_bat_dau',
    'ngay_ket_thuc',
    'link_online',
    'giao_vien',
    'so_thanh_vien',
    'action',
  ];
  courselist: CourseIntefce[] = JSON.parse(
    sessionStorage.getItem('courselist') || '[]'
  );
  coursepage: CourseIntefce[] = [];

  // data của bảng
  dataSource = this.coursepage;

  // thông tin của page
  curentPage = 0;
  pagelength = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[1];

  ngOnInit(): void {
    this.getall();
    this.searchCourse(
      this.searchof,
      this.content,
      this.curentPage,
      this.pageSize
    );
  }

  getall() {
    this.CourseApiService.getAllCourse().subscribe(() => {
      this.courselist = JSON.parse(
        sessionStorage.getItem('courselist') || '{}'
      );
      this.pagelength = this.courselist.length;
    });
  }

  // page control
  onChangePage(pe: PageEvent) {
    this.curentPage = pe.pageIndex;
    this.pageSize = pe.pageSize;
    this.searchCourse(
      this.searchof,
      this.content,
      this.curentPage,
      this.pageSize
    );
  }

  // search
  options = ['id', 'ten_lop', 'giao_vien'];
  searchof: string = this.options[0];
  content: string = '';

  searchCourse(
    colum: string,
    content: string,
    CurentPage: number,
    PageLength: number
  ) {
    if (content == '') {
      content = '%';
    }
    this.CourseApiService.searchCourse(
      colum,
      content,
      CurentPage,
      PageLength
    ).subscribe(() => {
      this.coursepage = JSON.parse(
        sessionStorage.getItem('searchcourseresults') || '{}'
      );
      this.dataSource = this.coursepage;
    });
  }

  opentab(link: string) {
    window.open(link, '_blank');
  }

  addcourse() {
    const dialogRef = this.dialog.open(CourseAdd, {
      width: '600px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.searchCourse(
        this.searchof,
        this.content,
        this.curentPage,
        this.pageSize
      );
    });
  }
}

// add course info component
@Component({
  selector: 'course-add',
  templateUrl: 'course-add.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseAdd {
  constructor(
    public dialogRef: MatDialogRef<CourseAdd>,
    private CourseApiService: CourseApiService,
    private UserApiService: UserApiService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: CourseIntefce
  ) {}
  teacher: any = '';
  options: any = [];
  course: CourseIntefce = {
    id_course: '0',
    ten_lop: '',
    ngay_bat_dau: '0 0 0',
    ngay_ket_thuc: '',
    link_online: '',
    giao_vien: '',
    so_thanh_vien: '',
  };
  hide = true;
  valid = true;
  startdate: any;
  enddate: any;
  ngOnInit(): void {
    this.getteacher();
  }

  onNoClick(): void {
    this.openSnackBar('Hủy chỉnh sửa', 'Đóng');
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.course.ngay_bat_dau = JSON.stringify(this.startdate)
      .split('T', 1)[0]
      .replace('"', '');
    this.course.ngay_ket_thuc = JSON.stringify(this.enddate)
      .split('T', 1)[0]
      .replace('"', '');

    if (
      this.course.ten_lop == '' ||
      this.course.ngay_bat_dau == '' ||
      this.course.ngay_ket_thuc == '' ||
      this.teacher == ''
    ) {
      this.openSnackBar('Hãy bổ sung thông tin', 'Đóng');
    } else {
      if (this.valid == false) {
        this.openSnackBar('Hãy sửa lại thông tin', 'Đóng');
      } else {
        console.log(this.course);
      }
    }
  }

  getteacher() {
    this.UserApiService.getAllTeacher().subscribe(() => {
      this.options = JSON.parse(sessionStorage.getItem('teacherlist') || '{}');
    });
  }

  so_luong_trung: any = {};
  checkcoursename(coursename: any) {
    this.CourseApiService.checkCourseName(coursename).subscribe(() => {
      this.so_luong_trung = JSON.parse(
        sessionStorage.getItem('coursenum') || '{}'
      );
      if (this.so_luong_trung[0].so_luong_trung > 0) {
        this.valid = false;
        this.openSnackBar('Tên lớp đã tồn tại', 'Đóng');
      }
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
