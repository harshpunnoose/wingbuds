import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { UiService } from 'src/app/common/services/ui.service';
import { SubjectsService } from '../data/subjects.service';

@Component({
  selector: 'app-add-subject-model',
  templateUrl: './add-subject-model.component.html',
  styleUrls: ['./add-subject-model.component.scss'],
})
export class AddSubjectModelComponent implements OnDestroy, OnInit {
  subject = {
    id: 0,
    name: '',
    code: '',
    description: '',
    status: '',
  };
  unsubscribe$ = new Subject<void>();

  isEdit = false;
  title = 'Add Subject';

  constructor(
    private modalCtrl: ModalController,
    private subjectsService: SubjectsService,
    private uiService: UiService
  ) { }


  ngOnInit(): void {
    this.isEdit = this.subject?.id > 0;
    this.title = this.isEdit ? `Edit Subject - ${this.subject?.name}` : "Add Subject";
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  saveSubject(): void {
    if (!this.subject) {
      this.uiService.showToast('Invalid Subject data', 'danger');
      return;
    }

    const formData = this.buildSubjectFormData();

    this.uiService.showLoading();

    const request$ = this.isEdit
      ? this.subjectsService.editSubject(this.subject.id, formData)
      : this.subjectsService.addSubject(formData);

    request$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => this.handleSuccess(res),
        error: (err) => this.handleError(err),
      });
  }

  private buildSubjectFormData(): FormData {
    const formData = new FormData();

    if (this.isEdit) {
      formData.append('_method', 'PUT');
    }

    Object.entries({
      name: this.subject.name,
      code: this.subject.code,
      description: this.subject.description,
      status: this.subject.status,
    }).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    });
    return formData;
  }

  private handleSuccess(res: any): void {
    this.uiService.hideLoading();

    const message = this.isEdit
      ? 'Subject updated successfully ✅'
      : 'Subject created successfully ✅';

    this.uiService.showToast(message, 'success');

    // Close modal and notify parent
    this.modalCtrl.dismiss(res?.data ?? this.subject, 'success');
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
