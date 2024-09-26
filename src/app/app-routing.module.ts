import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'teachers',
    loadChildren: () => import('./pages/teachers/teachers.module').then(m => m.TeachersPageModule)
  },
  {
    path: 'students',
    loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsPageModule)
  },
  {
    path: 'subjects',
    loadChildren: () => import('./pages/subjects/subjects.module').then(m => m.SubjectsPageModule)
  },
  {
    path: 'classes',
    loadChildren: () => import('./pages/classes/classes.module').then(m => m.ClassesPageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./pages/attendance/attendance.module').then(m => m.AttendancePageModule)
  },
  {
    path: 'fees',
    loadChildren: () => import('./pages/fees/fees.module').then(m => m.FeesPageModule)
  },
  {
    path: 'salary',
    loadChildren: () => import('./pages/salary/salary.module').then(m => m.SalaryPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
