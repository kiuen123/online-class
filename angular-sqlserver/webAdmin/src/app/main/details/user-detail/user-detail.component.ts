import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { UserApiService } from '../../../API/user-api.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  id: number = JSON.parse(localStorage.getItem('cruserid') || '0');
  user: any = {};
  constructor(private router: Router, private UserApiService: UserApiService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // thông tin user
        this.id = JSON.parse(localStorage.getItem('cruserid') || '0');
        this.UserApiService.getviewUserbyId(this.id).subscribe(async () => {
          this.user = await JSON.parse(
            localStorage.getItem('userbyid') || '{}'
          )[0];
        });
      }
    });
  }

  ngOnInit(): void {}
}
