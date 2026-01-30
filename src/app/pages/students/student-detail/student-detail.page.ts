import { ActivatedRoute, Router } from '@angular/router';
import { AddStudentModalComponent } from '../add-student-modal/add-student-modal.component';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentsService } from '../data/students.service';
import { Subject, takeUntil } from 'rxjs';
import { UiService } from 'src/app/common/services/ui.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.scss'],
})
export class StudentDetailPage implements OnInit, OnDestroy {
  student: any;
  selectedTab: string = 'profile';
  studentId = 0;
  unsubscribe$ = new Subject<void>();

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private studentsService: StudentsService,
    private uiService: UiService,

  ) { }

  ngOnInit() {
    this.getStudentDetailsByStudentId();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getStudentDetailsByStudentId(): void {
    this.uiService.showLoading();

    const idParam = this.route.snapshot.paramMap.get('id');
    this.studentId = Number(idParam);

    if (!idParam || isNaN(this.studentId)) {
      this.uiService.hideLoading();
      this.uiService.showToast('Invalid student ID.', 'danger');
      this.router.navigate(['/students']);
      return;
    }

    this.studentsService
      .getStudentDetailsByStudentId(this.studentId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          this.uiService.hideLoading();
          if (res?.success) {
            this.student = res.data;
          } else {
            this.uiService.showToast('Student not found.', 'danger');
            this.router.navigate(['/students']);
          }
        },
        error: (err: any) => {
          this.uiService.hideLoading();

          const msg = err?.error?.message || 'Unable to load student details. Please try again.';

          this.uiService.showToast(msg, 'danger');
          this.router.navigate(['/students']);
        }
      });
  }


  async editStudent(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddStudentModalComponent,
      componentProps: {
        student: this.student // pass existing data for edit
      }
    });

    modal.onDidDismiss().then(() => {
      this.getStudentDetailsByStudentId();
    });
    await modal.present();
  }

  async confirmDeleteStudent() {
    const alert = await this.alertCtrl.create({
      header: 'Delete Student',
      message: 'Are you sure you want to delete this student? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteStudent(this.studentId);
          },
        },
      ],
    });

    await alert.present();
  }


  private deleteStudent(studentId: number) {
    this.uiService.showLoading();

    this.studentsService
      .deleteStudent(studentId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.uiService.hideLoading();
          this.uiService.showToast('Student deleted successfully ✅', 'success');

          // 🔁 Navigate or refresh list
          this.router.navigate(['/students']);
        },
        error: err => {
          this.uiService.hideLoading();
          const msg =
            err?.error?.message || 'Failed to delete student. Please try again.';
          this.uiService.showToast(msg, 'danger');
        },
      });
  }



  openAssignSubject() {
    console.log('Open assign subject modal');
    // reuse AssignSubjectModalComponent
  }

  removeSubject(sub: any) {
    this.student.subjects = this.student.subjects.filter((s: any) => s !== sub);
  }

  generateBill() {
    console.log('Generate bill for', this.student);
    // later: backend integration
  }

  generateInvoice() {
    console.log('Generate invoice for', this.student);
    // later: backend integration
  }

  viewInvoice(bill: any) {
    console.log('View invoice', bill);
    // open pdf or detail modal
  }
}
