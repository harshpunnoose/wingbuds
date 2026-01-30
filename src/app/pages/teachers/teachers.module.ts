import { AddTeacherModalComponent } from './add-teacher-modal/add-teacher-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TeachersPage } from './teachers.page';
import { TeachersPageRoutingModule } from './teachers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeachersPageRoutingModule,
  ],
  declarations: [
    AddTeacherModalComponent,
    TeachersPage,
  ]
})
export class TeachersPageModule { }
