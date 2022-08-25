import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MaterialExampleModule } from '../../../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MaterialExampleModule,
    BrowserModule,
  ],
})
export class SidebarModule {}
