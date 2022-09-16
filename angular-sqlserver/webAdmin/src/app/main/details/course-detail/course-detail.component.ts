import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { CourseApiService } from '../../../API/course-api.service';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {
  course_detail: any = [];
  id: number = JSON.parse(sessionStorage.getItem('crcourseid') || '0');
  constructor(
    private CourseApiService: CourseApiService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.id = JSON.parse(sessionStorage.getItem('crcourseid') || '0');
        this.CourseApiService.getCourseById(this.id).subscribe(async () => {
          this.course_detail = await JSON.parse(
            sessionStorage.getItem('coursebyid') || '{}'
          );
        });
      }
    });
  }

  ngOnInit(): void {}

  opentab(link: string) {
    window.open(link, '_blank');
  }
}
