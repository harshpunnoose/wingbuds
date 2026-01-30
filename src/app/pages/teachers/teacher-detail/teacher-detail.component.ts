import { ActivatedRoute, Router } from '@angular/router';
import { AddTeacherModalComponent } from '../../teachers/add-teacher-modal/add-teacher-modal.component';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeachersService, } from '../../teachers/data/teachers.service';
import { Subject, takeUntil } from 'rxjs';
import { UiService } from 'src/app/common/services/ui.service';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss'],
})
export class TeacherDetailComponent implements OnInit, OnDestroy {
  teacher: any;
  selectedTab: string = 'profile';
  teacherId = 0;
  unsubscribe$ = new Subject<void>();

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private teachersService: TeachersService,
    private uiService: UiService,

  ) { }

  ngOnInit() {
    this.getteacherDetailsByteacherId();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getteacherDetailsByteacherId(): void {
    this.uiService.showLoading();

    const idParam = this.route.snapshot.paramMap.get('id');
    this.teacherId = Number(idParam);

    if (!idParam || isNaN(this.teacherId)) {
      this.uiService.hideLoading();
      this.uiService.showToast('Invalid teacher ID.', 'danger');
      this.router.navigate(['/teachers']);
      return;
    }

    this.teachersService
      .getTeacherDetailsByTeacherId(this.teacherId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          this.uiService.hideLoading();
          if (res?.success) {
            this.teacher = res.data;
          } else {
            this.uiService.showToast('Teacher not found.', 'danger');
            this.router.navigate(['/teachers']);
          }
        },
        error: (err: any) => {
          this.uiService.hideLoading();

          const msg = err?.error?.message || 'Unable to load teacher details. Please try again.';

          this.uiService.showToast(msg, 'danger');
          this.router.navigate(['/teachers']);
        }
      });
  }


  async editteacher(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddTeacherModalComponent,
      componentProps: {
        teacher: this.teacher // pass existing data for edit
      }
    });

    modal.onDidDismiss().then(() => {
      this.getteacherDetailsByteacherId();
    });
    await modal.present();
  }

  async confirmDeleteteacher() {
    const alert = await this.alertCtrl.create({
      header: 'Delete teacher',
      message: 'Are you sure you want to delete this teacher? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteteacher(this.teacherId);
          },
        },
      ],
    });

    await alert.present();
  }


  private deleteteacher(teacherId: number) {
    this.uiService.showLoading();

    this.teachersService
      .deleteTeacher(teacherId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.uiService.hideLoading();
          this.uiService.showToast('teacher deleted successfully ✅', 'success');

          // 🔁 Navigate or refresh list
          this.router.navigate(['/teachers']);
        },
        error: err => {
          this.uiService.hideLoading();
          const msg =
            err?.error?.message || 'Failed to delete teacher. Please try again.';
          this.uiService.showToast(msg, 'danger');
        },
      });
  }



  openAssignSubject() {
    console.log('Open assign subject modal');
    // reuse AssignSubjectModalComponent
  }

  removeSubject(sub: any) {
    this.teacher.subjects = this.teacher.subjects.filter((s: any) => s !== sub);
  }

  generateBill() {
    console.log('Generate bill for', this.teacher);
    // later: backend integration
  }

  generateInvoice() {
    console.log('Generate invoice for', this.teacher);
    // later: backend integration
  }

  viewInvoice(bill: any) {
    console.log('View invoice', bill);
    // open pdf or detail modal
  }
}

