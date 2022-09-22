import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialExampleModule } from '../../../../material.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserDetailComponent } from './user-detail.component';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

const routers: Routes = [{ path: '', component: UserDetailComponent }];

@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MaterialExampleModule,
    NgProgressModule.withConfig({ spinnerPosition: 'right', color: '#red' }),
    NgProgressHttpModule,
  ],
})
export class UserDetailModule {}
