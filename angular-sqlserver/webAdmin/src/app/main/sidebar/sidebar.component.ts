import { Component, OnInit } from '@angular/core';
export interface Section {
  title: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor() {}
  links: Section[] = [
    {
      title: 'User',
      icon: 'person',
      url: './user',
    },
    {
      title: 'Course',
      icon: 'local_library',
      url: './course',
    },
  ];
  ngOnInit(): void {}
}
