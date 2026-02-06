import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SubjectDetailComponent } from './subject-detail.component';
import { SubjectDetailRoutingModule } from './subject-detail-routing.module';



@NgModule({
  declarations: [SubjectDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubjectDetailRoutingModule,
  ]
})
export class SubjectDetailModule { }
