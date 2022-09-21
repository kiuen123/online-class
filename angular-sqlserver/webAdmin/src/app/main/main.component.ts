import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.openSnackBar('Xin chào ' + this.user[0].ten, '');
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  logout() {
    localStorage.removeItem('user');
    this.user = '{}';
    this.router.navigate(['']);
  }

  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(data: string, act: string) {
    this._snackBar.open(data, act, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
