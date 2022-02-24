import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path: 'employees',
    loadChildren: () => import('./employee/employee.module').then( m => m.EmployeeModule )
  },
  {
    path: '', redirectTo: 'employees', pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
