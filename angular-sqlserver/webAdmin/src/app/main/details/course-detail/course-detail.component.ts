import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router, Event, NavigationEnd } from '@angular/router';
import { CourseApiService } from '../../../API/course-api.service';
import { ClassListOpenedService } from '../../../main/services/class-list-opened.service';

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
  course_detail: any = [];
  coursepage: CourseUserIntefce[] = [];
  id: number = JSON.parse(localStorage.getItem('crcourseid') || '0');

  // tên các cột
  displayedColumns: string[] = [
    'ten',
    'email',
    'anh_dai_dien',
    'vai_tro',
    'giao_vien',
    'action',
  ];

  // thông tin của page
  curentPage = 0;
  pagelength = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[1];

  // data của bảng
  dataSource = this.coursepage;

  constructor(
    private CourseApiService: CourseApiService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // thông tin lớp
        this.id = JSON.parse(localStorage.getItem('crcourseid') || '0');
        this.CourseApiService.getCourseById(this.id).subscribe(async () => {
          this.course_detail = await JSON.parse(
            localStorage.getItem('coursebyid') || '{}'
          );
        });

        // danh sách lớp
        this.CourseApiService.getcourseuser(
          this.id,
          this.curentPage,
          this.pageSize
        ).subscribe(async () => {
          this.coursepage = await JSON.parse(
            localStorage.getItem('courseuserlist') || '{}'
          );
          this.dataSource = this.coursepage;
        });
        this.CourseApiService.getcourseuser(
          this.id,
          this.curentPage,
          100000000
        ).subscribe(async () => {
          this.pagelength = await JSON.parse(
            localStorage.getItem('courseuserlist') || '{}'
          ).length;
        });
      }
    });
  }

  ngOnInit(): void {}

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
}
