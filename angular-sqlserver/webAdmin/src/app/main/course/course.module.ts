import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialExampleModule } from '../../../material.module';
import { CourseAdd, CourseComponent } from './course.component';

const routers: Routes = [{ path: '', component: CourseComponent }];
@NgModule({
  declarations: [CourseComponent, CourseAdd],
  imports: [
    RouterModule.forChild(routers),
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MaterialExampleModule,
  ],
})
export class CourseModule {}
