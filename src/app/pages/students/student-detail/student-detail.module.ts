import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { StudentDetailPage } from './student-detail.page';
import { StudentDetailPageRoutingModule } from './student-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentDetailPageRoutingModule,
  ],
  declarations: [StudentDetailPage]
})
export class StudentDetailPageModule { }
