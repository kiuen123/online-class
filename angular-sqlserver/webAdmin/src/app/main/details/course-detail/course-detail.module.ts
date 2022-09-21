import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailComponent } from './course-detail.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialExampleModule } from '../../../../material.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

const routers: Routes = [{ path: '', component: CourseDetailComponent }];

@NgModule({
  declarations: [CourseDetailComponent],
  imports: [
    RouterModule.forChild(routers),
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MaterialExampleModule,
  ],
})
export class CourseDetailModule {}
