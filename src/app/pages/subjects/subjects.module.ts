import { AddSubjectModelComponent } from './add-subject-model/add-subject-model.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SubjectsPage } from './subjects.page';
import { SubjectsPageRoutingModule } from './subjects-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubjectsPageRoutingModule,
  ],
  declarations: [
    AddSubjectModelComponent,
    SubjectsPage,
  ]
})
export class SubjectsPageModule { }
