import { AddStudentModalComponent } from './add-student-modal/add-student-modal.component';
import { AssignSubjectModalComponent } from './assign-subject-modal/assign-subject-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { StudentsPage } from './students.page';
import { StudentsPageRoutingModule } from './students-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentsPageRoutingModule,
  ],
  declarations: [
    AddStudentModalComponent,
    AssignSubjectModalComponent,
    StudentsPage,
  ],
})
export class StudentsPageModule { }
