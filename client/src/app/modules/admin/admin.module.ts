import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BookingsComponent } from './components/bookings/bookings.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    BookingsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
