import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  progress_status = 'start';
  constructor() {
    this.progress_status = 'start';
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.progress_status = 'complete';
    }, 1000);
  }
}
