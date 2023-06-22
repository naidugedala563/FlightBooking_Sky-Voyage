import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { FlightsComponent } from './components/flights/flights.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    BookingsComponent,
    HomeComponent,
    FlightsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
