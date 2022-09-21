import { Component, OnInit, OnChanges } from '@angular/core';
import {
  ClassListOpenedService,
  ClassSection,
} from '../services/class-list-opened.service';
import {
  UserListOpenedService,
  UserSection,
} from '../services/user-list-opened.service';
export interface LinkSection {
  title: string;
  icon: string;
  url: string;
}
import {
  Router,
  ActivatedRoute,
  Params,
  Event,
  NavigationEnd,
} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  class_list_opened: ClassSection[] =
    this.ClassListOpenedService.get_class_section();
  user_list_opened: UserSection[] =
    this.UserListOpenedService.get_user_section();
  classnum: number = this.class_list_opened.length;
  usernum: number = this.user_list_opened.length;
  constructor(
    private ClassListOpenedService: ClassListOpenedService,
    private UserListOpenedService: UserListOpenedService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.classnum = this.class_list_opened.length;
        this.usernum = this.user_list_opened.length;
      }
    });
  }
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
  // class list

  async closecourse(id: number) {
    await this.ClassListOpenedService.close_class_section(id);
    this.class_list_opened = this.ClassListOpenedService.get_class_section();
    if (this.class_list_opened.length == 0) {
      this.router.navigate(['/main/course']);
    }
    if (id == this.activatedRoute.snapshot.params['id']) {
      this.router.navigate(['/main/course']);
    }
    this.classnum = this.class_list_opened.length;
  }
  changecourse(id: number) {
    localStorage.setItem('crcourseid', id.toString());
  }

  // user list

  async closeuser(id: number) {
    await this.UserListOpenedService.close_user_section(id);
    this.user_list_opened = this.UserListOpenedService.get_user_section();
    if (this.user_list_opened.length == 0) {
      this.router.navigate(['/main/user']);
    }
    if (id == this.activatedRoute.snapshot.params['id']) {
      this.router.navigate(['/main/user']);
    }
    this.usernum = this.user_list_opened.length;
  }
  changeuser(id: number) {
    localStorage.setItem('cruserid', id.toString());
  }

  ngOnInit(): void {}

  ngonchanges(): void {}
}
