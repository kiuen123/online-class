import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { MatCardModule } from '@angular/material/card';

const routers: Routes = [{ path: '', component: HomeComponent }];
@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(routers),
    MatCardModule,
    NgProgressModule.withConfig({ spinnerPosition: 'right', color: '#red' }),
    NgProgressHttpModule,
  ],
  exports: [],
})
export class HomeModule {}
