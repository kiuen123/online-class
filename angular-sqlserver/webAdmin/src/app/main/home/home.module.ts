import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routers: Routes = [{ path: '', component: HomeComponent }];
@NgModule({
  declarations: [HomeComponent],
  imports: [RouterModule.forChild(routers)],
  exports: [],
})
export class HomeModule {}
