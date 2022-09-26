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
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxEditorModule, schema } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    NgProgressModule.withConfig({ spinnerPosition: 'right', color: '#red' }),
    NgProgressHttpModule,
    NgxEditorModule,
  ],
})
export class CourseDetailModule {}
