import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router, Event, NavigationEnd } from '@angular/router';
import { CourseApiService } from '../../../API/course-api.service';
import { Post, PostApiService } from '../../../API/post-api.service';
import { UserListOpenedService } from '../../../main/services/user-list-opened.service';
import { UserSection } from '../../services/user-list-opened.service';
import { schema } from 'ngx-editor/schema';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
// course list interface
export interface CourseUserIntefce {
  ten?: string;
  email?: string;
  anh_dai_dien?: string;
  vai_tro?: string;
  teacher?: string;
}

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {
  progress_status = '';
  id: number = JSON.parse(localStorage.getItem('crcourseid') || '0');

  course_detail: any = [];
  coursepage: CourseUserIntefce[] = [];
  // tên các cột
  displayedColumns: string[] = [
    'ten',
    'email',
    'anh_dai_dien',
    'vai_tro',
    'giao_vien',
    'action',
  ];
  // data của bảng 1
  dataSource = this.coursepage;

  learntime: any = [];

  // thông tin của page
  curentPage = 0;
  pagelength = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[1];

  constructor(
    private CourseApiService: CourseApiService,
    private UserListOpenedService: UserListOpenedService,
    private PostApiService: PostApiService,
    private Router: Router,
    private _snackBar: MatSnackBar,
    private DomSanitizer: DomSanitizer
  ) {
    this.Router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationEnd) {
        await this.classinfo();
      }
    });
  }

  editor!: Editor;

  toolbar: Toolbar = [
    ['bold', 'italic', 'underline'],
    ['code', 'blockquote'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  form = new FormGroup({
    editorContent: new FormControl({ value: '', disabled: false }),
  });

  cruser: any = JSON.parse(localStorage.getItem('user') || '0');
  post: Post = {
    title: '',
  };

  addcontent() {
    this.post.id_tacgia = this.cruser[0].id;
    this.post.id_course = this.id;
    this.post.content = this.form.value.editorContent!.toString();
    this.post.title = this.post.title;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.post.created_at = yyyy + '/' + mm + '/' + dd;
    this.post.update_at = yyyy + '/' + mm + '/' + dd;

    this.PostApiService.AddPost(this.post).subscribe((res: any) => {
      const message = res.split(':')[0];
      const rows_affected = res.split(':')[1];
      if (message == 'rows_affected ' && rows_affected > 0) {
        this.openSnackBar('Thêm bài viết thành công', 'Đóng');
        this.classpost();
      } else this.openSnackBar(res, 'Đóng');
    });
  }

  async ngOnInit(): Promise<void> {
    this.editor = new Editor();
    this.progress_status = 'start';
  }

  async classinfo() {
    // thông tin lớp
    this.id = JSON.parse(localStorage.getItem('crcourseid') || '0');
    // lấy thông tin lớp theo id
    await this.CourseApiService.getCourseById(this.id).subscribe(async () => {
      this.course_detail = await JSON.parse(
        localStorage.getItem('coursebyid') || '{}'
      );
      // lấy giờ học của lớp
      await this.CourseApiService.getCourseLearnTime(this.id).subscribe(
        async () => {
          this.learntime = await JSON.parse(
            localStorage.getItem('courselearntime') || '{}'
          );
          // lấy danh sách lớp
          await this.classlist();
        }
      );
    });
  }

  async classlist() {
    // danh sách lớp
    // lấy số học sinh trong lớp
    await this.CourseApiService.getcourseuser(
      this.id,
      this.curentPage,
      100000000
    ).subscribe(async () => {
      this.pagelength = await JSON.parse(
        localStorage.getItem('courseuserlist') || '{}'
      ).length;
      // lấy danh sách học sinh trong lớp
      await this.CourseApiService.getcourseuser(
        this.id,
        this.curentPage,
        this.pageSize
      ).subscribe(async () => {
        this.coursepage = await JSON.parse(
          localStorage.getItem('courseuserlist') || '{}'
        );
        // gán dữ liệu vào bảng
        this.dataSource = this.coursepage;
        // lấy danh sách bài viết của lớp
        await this.classpost();
      });
    });
  }

  postlist: any = [];
  safehtmlStr: SafeHtml[] = [];
  async classpost() {
    // các bài viết của lớp
    // lấy danh sách bài viết của lớp
    this.PostApiService.GetAllPostbyCourseId(this.id).subscribe(async () => {
      this.postlist = await JSON.parse(
        localStorage.getItem('postlist') || '{}'
      );
      // gán content thành safehtml string
      for (let i = 0; i < this.postlist.length; i++) {
        this.safehtmlStr[i] = this.DomSanitizer.bypassSecurityTrustHtml(
          this.postlist[i].content
        );
      }
      // lấy danh sách tài liệu của lớp
      await this.classstore();
    });
  }

  async classstore() {
    // các tài kiệu của lớp
    console.log('store');

    // lấy danh sách bài kiểm tra
    await this.classtest();
  }

  async classtest() {
    // các bài kiểm tra của lớp
    console.log('test');

    // hoàn thiện load trang
    this.progress_status = 'complete';
  }

  dateformat(date: string): string {
    if (date === undefined) return '';
    let afterdate = date.split('T', 1)[0].split('-', 3).reverse().join('-');
    return afterdate;
  }

  opentab(link: string) {
    window.open(link, '_blank');
  }

  // page control
  onChangePage(pe: PageEvent) {
    this.curentPage = pe.pageIndex;
    this.pageSize = pe.pageSize;
  }

  showuser(id: number, name: string) {
    let adduser: UserSection = {
      id: id,
      title: name,
      url: './user/' + id,
    };
    this.UserListOpenedService.add_user_section(adduser);
    localStorage.setItem('cruserid', id.toString());
    this.Router.navigate(['./main/user/' + id]);
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
