import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { AddStudentModalComponent } from './add-student-modal/add-student-modal.component';
import { AssignSubjectModalComponent } from './assign-subject-modal/assign-subject-modal.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserInfoPagination, UserType } from 'src/app/common/models/user-info';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();
  userInfo!: UserInfoPagination;
  filteredUsers: any[] = [];
  searchText: string = '';
  sortField: string = 'first_name'; // default sort

  constructor(
    private userService: UserService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUserInfoByType();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getUserInfoByType(): void {
    this.userService.getUserInfoByType(UserType.Student)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: UserInfoPagination) => {
        this.userInfo = data;
        this.filteredUsers = [...(data?.userInfo || [])];
        this.sortStudents();
      });
  }

  filterStudents(): void {
    const text = this.searchText.toLowerCase();
    let users = this.userInfo?.userInfo || [];

    if (text) {
      users = users.filter(user =>
        (user?.first_name + ' ' + user?.last_name).toLowerCase().includes(text)
      );
    }

    this.filteredUsers = [...users];
    this.sortStudents();
  }

  sortStudents(): void {
    if (!this.filteredUsers) return;

    this.filteredUsers.sort((a, b) => {
      const fieldA = (a?.[this.sortField] ?? '').toString().toLowerCase();
      const fieldB = (b?.[this.sortField] ?? '').toString().toLowerCase();

      if (fieldA < fieldB) return -1;
      if (fieldA > fieldB) return 1;
      return 0;
    });
  }

  async openSortOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Sort by',
      buttons: [
        {
          text: 'First Name',
          handler: () => {
            this.sortField = 'first_name';
            this.sortStudents();
          }
        },
        {
          text: 'Last Name',
          handler: () => {
            this.sortField = 'last_name';
            this.sortStudents();
          }
        },
        {
          text: 'Status',
          handler: () => {
            this.sortField = 'status';
            this.sortStudents();
          }
        },
        {
          text: 'Fees',
          handler: () => {
            this.sortField = 'fees';
            this.sortStudents();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        }
      ]
    });

    await actionSheet.present();
  }

  async openAddStudentModal() {
    const modal = await this.modalCtrl.create({
      component: AddStudentModalComponent
    });

    modal.onDidDismiss().then(result => {
      if (result.data) {
        console.log('New Student:', result.data);
        this.userInfo.userInfo.push(result.data); // Save locally (or send to API)
      }
    });

    return await modal.present();
  }


  addStudent(newStudent: any) {
    this.userService.addUser(newStudent).subscribe({
      next: () => this.getUserInfoByType(),
      error: (err) => console.error('Error saving student', err)
    });
  }

  async editStudent(student: any) {
    const modal = await this.modalCtrl.create({
      component: AddStudentModalComponent,
      componentProps: { student } // pass existing data for edit
    });

    modal.onDidDismiss().then(res => {
      if (res.data) {
        Object.assign(student, res.data); // update local object
      }
    });

    return await modal.present();
  }

  async deleteStudent(student: any) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Student',
      message: `Are you sure you want to delete ${student.first_name}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete', role: 'destructive', handler: () => {
            this.userInfo.userInfo = this.userInfo.userInfo.filter(s => s !== student);
          }
        }
      ]
    });
    await alert.present();
  }

  async openAssignSubject(student: any) {
    const modal = await this.modalCtrl.create({
      component: AssignSubjectModalComponent,
      componentProps: { student }
    });

    modal.onDidDismiss().then(res => {
      if (res.data) {
        student.subjects = res.data; // assign subjects to student
      }
    });

    return await modal.present();
  }

  generateBill(student: any) {
    console.log('Generating Bill for', student);
    // Later: integrate with backend service to create bill PDF/record
  }

  generateInvoice(student: any) {
    console.log('Generating Invoice for', student);
    // Later: integrate with backend service
  }

  openStudentDetail(user: any) {
    this.router.navigate(['/student', user.id]);
  }

}
