import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,) {}

  id:number = this.activatedRoute.snapshot.params['id'];

  ngOnInit(): void {}
}
