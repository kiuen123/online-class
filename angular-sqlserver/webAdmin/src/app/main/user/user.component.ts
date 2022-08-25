import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserApiService } from '../../API/user-api.service';
import { MatDialog } from '@angular/material/dialog';

// user list interface
export interface UserIntefce {
  id?: string;
  ten?: string;
  email?: string;
  vai_tro?: string;
  anh_dai_dien?: string;
  tom_tat?: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private router: Router,
    private UserApiService: UserApiService,
    public dialog: MatDialog
  ) {}
  // tên các cột
  displayedColumns: string[] = [
    'id',
    'ten',
    'email',
    'vai_tro',
    'tom_tat',
    'action',
  ];
  userlist: UserIntefce[] = JSON.parse(
    sessionStorage.getItem('userlist') || '[]'
  );
  userpage: UserIntefce[] = JSON.parse(
    sessionStorage.getItem('userpage') || '[]'
  );
  // data của bảng
  dataSource = this.userpage;

  // thông tin của page
  curentPage = 0;
  pagelength = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = this.pageSizeOptions[1];

  ngOnInit(): void {
    this.getall();
    this.getpage();
  }

  getall() {
    this.UserApiService.getAllUser().subscribe(() => {
      this.userlist = JSON.parse(sessionStorage.getItem('userlist') || '{}');
      this.pagelength = this.userlist.length;
    });
  }
  getpage() {
    this.UserApiService.getUserPage(this.curentPage, this.pageSize).subscribe(
      () => {
        this.userpage = JSON.parse(sessionStorage.getItem('userpage') || '{}');
        this.dataSource = this.userpage;
      }
    );
  }

  // page control
  onChangePage(pe: PageEvent) {
    this.curentPage = pe.pageIndex;
    this.pageSize = pe.pageSize;
    this.getpage();
  }

  edituser(id: string) {}
}
