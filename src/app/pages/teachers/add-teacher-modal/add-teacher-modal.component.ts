import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { UiService } from 'src/app/common/services/ui.service';
import { TeachersService } from '../data/teachers.service';

@Component({
  selector: 'app-add-teacher-modal',
  templateUrl: './add-teacher-modal.component.html',
  styleUrls: ['./add-teacher-modal.component.scss'],
})
export class AddTeacherModalComponent implements OnDestroy, OnInit {
  teacher = {
    id: 0,
    skype_id: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    phone: '',
    status: 'active',
    user_img: '',   // will be Base64 or uploaded URL
    username: ''
  };
  selectedImage!: File | null;
  unsubscribe$ = new Subject<void>();

  previewImage: string | ArrayBuffer | null = null;
  isEdit = false;
  title = 'Add Teacher';

  constructor(
    private modalCtrl: ModalController,
    private teachersService: TeachersService,
    private uiService: UiService
  ) { }


  ngOnInit(): void {
    this.isEdit = this.teacher?.id > 0;
    this.title = this.isEdit ? `Edit Teacher - ${this.teacher?.first_name} ${this.teacher?.last_name}` : "Add Teacher";
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedImage = file;
    }
  }

  saveTeacher(): void {
    if (!this.teacher) {
      this.uiService.showToast('Invalid Teacher data', 'danger');
      return;
    }

    const formData = this.buildTeacherFormData();

    this.uiService.showLoading();

    const request$ = this.isEdit
      ? this.teachersService.editTeacher(this.teacher.id, formData)
      : this.teachersService.addTeacher(formData);

    request$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => this.handleSuccess(res),
        error: (err) => this.handleError(err),
      });
  }

  private buildTeacherFormData(): FormData {
    const formData = new FormData();

    if (this.isEdit) {
      formData.append('_method', 'PUT');
    }

    Object.entries({
      first_name: this.teacher.first_name,
      last_name: this.teacher.last_name,
      username: this.teacher.username,
      password: this.teacher.password,
      email: this.teacher.email,
      phone: this.teacher.phone,
      skype_id: this.teacher.skype_id,
      status: this.teacher.status,
    }).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    });

    if (this.selectedImage) {
      formData.append('user_img', this.selectedImage);
    }

    return formData;
  }

  private handleSuccess(res: any): void {
    this.uiService.hideLoading();

    const message = this.isEdit
      ? 'Teacher updated successfully ✅'
      : 'Teacher created successfully ✅';

    this.uiService.showToast(message, 'success');

    this.selectedImage = null;

    // Close modal and notify parent
    this.modalCtrl.dismiss(res?.data ?? this.teacher, 'success');
  }

  private handleError(err: any): void {
    this.uiService.hideLoading();

    const msg =
      err?.error?.message ||
      err?.error?.errors?.[Object.keys(err?.error?.errors || {})[0]]?.[0] ||
      'Something went wrong. Please try again.';

    this.uiService.showToast(msg, 'danger');
  }
}
