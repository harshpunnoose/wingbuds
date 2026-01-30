import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherDetailComponent } from './teacher-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherDetailRoutingModule { }
