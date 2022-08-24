import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { mainRoutes } from './main.routes';
import { SidebarComponent } from './sidebar/sidebar.component';
@NgModule({
  declarations: [MainComponent, SidebarComponent],
  imports: [
    RouterModule.forChild(mainRoutes),
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    MatMenuModule,
  ],
  providers: [],
  exports: [],
})
export class MainModule {}
