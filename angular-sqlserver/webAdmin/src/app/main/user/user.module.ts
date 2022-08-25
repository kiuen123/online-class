import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

const routers: Routes = [{ path: '', component: UserComponent }];
@NgModule({
  declarations: [UserComponent],
  imports: [
    RouterModule.forChild(routers),
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
  ],
})
export class UserModule {}
