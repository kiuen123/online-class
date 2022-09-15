import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailComponent } from './course-detail.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

const routers: Routes = [{ path: '', component: CourseDetailComponent }];

@NgModule({
  declarations: [CourseDetailComponent],
  imports: [RouterModule.forChild(routers), CommonModule],
})
export class CourseDetailModule {}
