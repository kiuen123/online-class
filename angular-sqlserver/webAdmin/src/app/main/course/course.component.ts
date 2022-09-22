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
import {
  ClassListOpenedService,
  ClassSection,
} from '../services/class-list-opened.service';

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
  progress_status = '';

  constructor(
    private CourseApiService: CourseApiService,
    private ClassListOpenedService: ClassListOpenedService,
    public dialog: MatDialog,
    private Router: Router
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
    localStorage.getItem('courselist') || '[]'
  );
  coursepage: CourseIntefce[] = [];

  // data của bảng
  dataSource = this.coursepage;

  // thông tin của page
  curentPage = 0;
  pagelength = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[1];

  async ngOnInit(): Promise<void> {
    await this.getall();
    await this.searchCourse(
      this.searchof,
      this.content,
      this.curentPage,
      this.pageSize
    );
  }

  getall() {
    this.progress_status = 'start';
    this.CourseApiService.getAllCourse().subscribe(async () => {
      this.courselist = await JSON.parse(
        localStorage.getItem('courselist') || '{}'
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
    ).subscribe(async () => {
      this.coursepage = await JSON.parse(
        localStorage.getItem('searchcourseresults') || '{}'
      );
      this.dataSource = this.coursepage;

      this.progress_status = 'complete';
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

  show(id: number, name: string) {
    let addclass: ClassSection = {
      id: id,
      title: name,
      url: './course/' + id,
    };
    this.ClassListOpenedService.add_class_section(addclass);
    localStorage.setItem('crcourseid', id.toString());
    this.Router.navigate(['./main/course/' + id]);
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
      this.course.giao_vien == ''
    ) {
      this.openSnackBar('Hãy bổ sung thông tin', 'Đóng');
    } else {
      if (this.valid == false) {
        this.openSnackBar('Hãy sửa lại thông tin', 'Đóng');
      } else {
        this.CourseApiService.addCourse({
          teacher_id: this.course.giao_vien,
          ten_lop: this.course.ten_lop,
          ngay_bat_dau: this.course.ngay_bat_dau,
          ngay_ket_thuc: this.course.ngay_ket_thuc,
          link_online: this.course.giao_vien,
        }).subscribe((res: any) => {
          const message = res.split(':')[0];
          const rows_affected = res.split(':')[1];
          if (message == 'rows_affected ' && rows_affected > 0) {
            this.openSnackBar('Thêm khóa học thành công', 'Đóng');
            this.dialogRef.close();
          } else this.openSnackBar(res, 'Đóng');
        });
      }
    }
  }

  getteacher() {
    this.UserApiService.getAllTeacher().subscribe(async () => {
      this.options = await JSON.parse(
        localStorage.getItem('teacherlist') || '{}'
      );
    });
  }

  so_luong_trung: any = {};
  checkcoursename(coursename: any) {
    this.CourseApiService.checkCourseName(coursename).subscribe(() => {
      this.so_luong_trung = JSON.parse(
        localStorage.getItem('coursenum') || '{}'
      );
      if (this.so_luong_trung[0].so_luong_trung > 0) {
        this.valid = false;
        this.openSnackBar('Tên lớp đã tồn tại', 'Đóng');
      } else this.valid = true;
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
