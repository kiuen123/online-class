import { Component, OnInit } from '@angular/core';
import {
  ClassListOpenedService,
  ClassSection,
} from '../../services/class-list-opened.service';
export interface LinkSection {
  title: string;
  icon: string;
  url: string;
}
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private ClassListOpenedService: ClassListOpenedService,
    private activatedRoute: ActivatedRoute,
    private Router: Router
  ) {}
  panelOpenState = true;
  links: LinkSection[] = [
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

  class_list_opened: ClassSection[] =
    this.ClassListOpenedService.get_class_section();

  async close(id: number) {
    await this.ClassListOpenedService.close_class_section(id);
    this.class_list_opened = this.ClassListOpenedService.get_class_section();
  }

  ngOnInit(): void {}
}
