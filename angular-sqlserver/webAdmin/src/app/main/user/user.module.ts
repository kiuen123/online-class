import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

const routers: Routes = [{ path: '', component: UserComponent }];
@NgModule({
  declarations: [UserComponent],
  imports: [
    RouterModule.forChild(routers),
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
  ],
})
export class UserModule {}
