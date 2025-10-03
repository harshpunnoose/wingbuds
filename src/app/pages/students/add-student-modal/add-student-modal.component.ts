import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.scss']
})
export class AddStudentModalComponent {
  student = {
    alt_phone: '',
    email: '',
    first_name: '',
    last_name: '',
    parent: '',
    password: '',
    phone: '',
    status: 'active',
    user_img: '',   // will be Base64 or uploaded URL
    username: ''
  };

  previewImage: string | ArrayBuffer | null = null;

  constructor(private modalCtrl: ModalController) { }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  // ✅ Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
        this.student.user_img = reader.result as string; // Save as Base64
      };
      reader.readAsDataURL(file);
    }
  }

  saveStudent() {
    this.modalCtrl.dismiss(this.student); // send data back to parent
  }
}
