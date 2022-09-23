import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router, Event, NavigationEnd } from '@angular/router';
import { async } from 'rxjs';
import { CourseApiService } from '../../../API/course-api.service';
import { UserListOpenedService } from '../../../main/services/user-list-opened.service';
import { UserSection } from '../../services/user-list-opened.service';

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
    private Router: Router
  ) {
    this.Router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationEnd) {
        await this.classinfo();
        await this.classlist();
        await this.classpost();
        await this.classstore();
        await this.classtest();

        this.progress_status = 'complete';
      }
    });
  }
  
  async ngOnInit(): Promise<void> {
    this.progress_status = 'start';
  }

  async classinfo() {
    // thông tin lớp
    this.id = JSON.parse(localStorage.getItem('crcourseid') || '0');
    await this.CourseApiService.getCourseById(this.id).subscribe(async () => {
      this.course_detail = await JSON.parse(
        localStorage.getItem('coursebyid') || '{}'
      );
    });
    await this.CourseApiService.getCourseLearnTime(this.id).subscribe(
      async () => {
        this.learntime = await JSON.parse(
          localStorage.getItem('courselearntime') || '{}'
        );
      }
    );
  }

  async classlist() {
    // danh sách lớp
    await this.CourseApiService.getcourseuser(
      this.id,
      this.curentPage,
      100000000
    ).subscribe(async () => {
      this.pagelength = await JSON.parse(
        localStorage.getItem('courseuserlist') || '{}'
      ).length;
    });
    await this.CourseApiService.getcourseuser(
      this.id,
      this.curentPage,
      this.pageSize
    ).subscribe(async () => {
      this.coursepage = await JSON.parse(
        localStorage.getItem('courseuserlist') || '{}'
      );
      this.dataSource = this.coursepage;
    });
  }

  async classpost() {
    // các bài viết của lớp
  }

  async classstore() {
    // các tài kiệu của lớp
  }

  async classtest() {
    // các bài kiểm tra của lớp
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
}
