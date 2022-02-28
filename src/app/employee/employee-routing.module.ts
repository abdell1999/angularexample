import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FormComponent } from './form/form.component';
import { IndexComponent } from './index/index.component';




const routes: Routes = [

  {
    path: '',
    children: [
      { path: 'create', component: CreateComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'index', component: IndexComponent },
      { path: 'pruebas', component: FormComponent },
      { path: '', redirectTo: 'index', pathMatch: 'full'},
    ]
  }

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmployeeRoutingModule { }
