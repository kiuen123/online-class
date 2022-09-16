import { Component, OnInit, OnChanges } from '@angular/core';
import {
  ClassListOpenedService,
  ClassSection,
} from '../services/class-list-opened.service';
export interface LinkSection {
  title: string;
  icon: string;
  url: string;
}
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private ClassListOpenedService: ClassListOpenedService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
  classnum: number = this.ClassListOpenedService.get_class_list_opened_length();

  async close(id: number) {
    await this.ClassListOpenedService.close_class_section(id);
    this.class_list_opened = this.ClassListOpenedService.get_class_section();
    if (this.class_list_opened.length == 0) {
      this.router.navigate(['/main/course']);
    }
    if (id == this.activatedRoute.snapshot.params['id']) {
      this.router.navigate(['/main/course']);
    }
  }
  changecourse(id: number) {
    sessionStorage.setItem('crcourseid', id.toString());
  }

  ngOnInit(): void {}

  ngonchanges(): void {}
}
