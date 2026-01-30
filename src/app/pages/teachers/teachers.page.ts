import { ActionSheetController, ModalController } from '@ionic/angular';
import { AddTeacherModalComponent } from './add-teacher-modal/add-teacher-modal.component';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TeachersService } from './data/teachers.service';
import { UiService } from 'src/app/common/services/ui.service';
import { UserInfo, UserInfoPagination } from 'src/app/common/models/user-info';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.page.html',
  styleUrls: ['./teachers.page.scss'],
})
export class TeachersPage implements OnDestroy {

  filteredUsers: any[] = [];
  searchText: string = '';
  sortField: string = 'first_name'; // default sort
  unsubscribe$ = new Subject<void>();
  userInfo: UserInfo[] = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private router: Router,
    private teachersService: TeachersService,
    private uiService: UiService,
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ionViewWillEnter() {
    this.getTeacherList();
  }

  getTeacherList(): void {
    this.uiService.showLoading();
    this.teachersService.getTeacherList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: UserInfoPagination) => {
        this.uiService.hideLoading();
        const userListData: UserInfo[] = data?.data?.data;
        this.userInfo = userListData;
        this.filteredUsers = [...(userListData || [])];
        this.sortTeachers();
      });
  }

  filterTeachers(): void {
    const text = this.searchText.toLowerCase();
    let users = this.userInfo || [];

    if (text) {
      users = users.filter(user =>
        (user?.first_name + ' ' + user?.last_name).toLowerCase().includes(text)
      );
    }

    this.filteredUsers = [...users];
    this.sortTeachers();
  }

  sortTeachers(): void {
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
            this.sortTeachers();
          }
        },
        {
          text: 'Last Name',
          handler: () => {
            this.sortField = 'last_name';
            this.sortTeachers();
          }
        },
        {
          text: 'Status',
          handler: () => {
            this.sortField = 'status';
            this.sortTeachers();
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

  async openAddTeacherModal() {
    const modal = await this.modalCtrl.create({
      component: AddTeacherModalComponent
    });

    modal.onDidDismiss().then(result => {
      if (result.data) {
        this.getTeacherList();
      }
    });

    return await modal.present();
  }

  openTeacherDetail(user: any) {
    this.router.navigate(['/teacher', user.id]);
  }

}
