import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './core/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {path:'admin-dashboard', component: AdminDashboardComponent},
  {path: "", redirectTo:"admin-dashboard", pathMatch: 'full'},
  {path: '**', redirectTo:"admin-dashboard", pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
