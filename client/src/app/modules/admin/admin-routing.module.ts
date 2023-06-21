import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookingsComponent } from './components/bookings/bookings.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,
    children: [
      {
        path:'bookings',
        component:BookingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
