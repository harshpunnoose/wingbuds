import { ActionSheetController, ModalController } from '@ionic/angular';
import { AddStudentModalComponent } from './add-student-modal/add-student-modal.component';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from './data/students.service';
import { Subject, takeUntil } from 'rxjs';
import { UiService } from 'src/app/common/services/ui.service';
import { UserInfo, UserInfoPagination } from 'src/app/common/models/user-info';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnDestroy {

  filteredUsers: any[] = [];
  searchText: string = '';
  sortField: string = 'first_name'; // default sort
  unsubscribe$ = new Subject<void>();
  userInfo: UserInfo[] = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private router: Router,
    private studentsService: StudentsService,
    private uiService: UiService,
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ionViewWillEnter() {
    this.getStudentList();
  }

  getStudentList(): void {
    this.uiService.showLoading();
    this.studentsService.getStudentList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: UserInfoPagination) => {
        this.uiService.hideLoading();
        const userListData: UserInfo[] = data?.data?.data;
        this.userInfo = userListData;
        this.filteredUsers = [...(userListData || [])];
        this.sortStudents();
      });
  }

  filterStudents(): void {
    const text = this.searchText.toLowerCase();
    let users = this.userInfo || [];

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
        this.getStudentList();
      }
    });

    return await modal.present();
  }

  openStudentDetail(user: any) {
    this.router.navigate(['/student', user.id]);
  }

}
