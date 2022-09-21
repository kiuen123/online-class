import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  UserAdd,
  UserComponent,
  UserDelete,
  UserUpdate,
} from './user.component';
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
import { MatMenuModule } from '@angular/material/menu';

const routers: Routes = [{ path: '', component: UserComponent }];
@NgModule({
  declarations: [UserComponent, UserUpdate, UserDelete, UserAdd],
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
    MatMenuModule,
  ],
})
export class UserModule {}
