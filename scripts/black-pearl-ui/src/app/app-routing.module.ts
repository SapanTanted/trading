import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LatestStockPriceTableComponent } from './latest-stock-price-table/latest-stock-price-table.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'home',component:HeaderComponent},
  {path:'latest-stock-price-table',component:LatestStockPriceTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
