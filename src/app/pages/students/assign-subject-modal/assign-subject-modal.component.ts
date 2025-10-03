import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-assign-subject-modal',
  templateUrl: './assign-subject-modal.component.html'
})
export class AssignSubjectModalComponent {
  @Input() student: any;

  subject = {
    subject: '',
    teacher: '',
    fees: 0
  };

  constructor(private modalCtrl: ModalController) { }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  saveSubject() {
    if (!this.student.subjects) this.student.subjects = [];
    this.student.subjects.push({ ...this.subject });
    this.modalCtrl.dismiss(this.student.subjects);
  }
}
