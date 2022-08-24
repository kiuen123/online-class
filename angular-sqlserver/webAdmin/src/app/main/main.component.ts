import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  user: any = JSON.parse(sessionStorage.getItem('user') || '{}');
  constructor(private router: Router) {}
  ngOnInit(): void {
    console.log(this.user);
  }
  logout() {
    sessionStorage.removeItem('user');
    this.user = '{}';
    this.router.navigate(['']);
  }
}
