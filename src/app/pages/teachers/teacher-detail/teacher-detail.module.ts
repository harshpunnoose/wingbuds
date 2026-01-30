import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TeacherDetailComponent } from './teacher-detail.component';
import { TeacherDetailRoutingModule } from './teacher-detail-routing.module';

@NgModule({
  declarations: [
    TeacherDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherDetailRoutingModule,
  ]
})
export class TeacherDetailModule { }
