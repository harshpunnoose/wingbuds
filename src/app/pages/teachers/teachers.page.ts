import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserInfo, UserInfoPagination, UserType } from 'src/app/common/models/user-info';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.page.html',
  styleUrls: ['./teachers.page.scss'],
})
export class TeachersPage implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();
  userInfo!: UserInfoPagination;
  filteredUsers: UserInfo[] = [];
  searchText: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserInfoByType();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getUserInfoByType(): void {
    this.userService.getUserInfoByType(UserType.Teacher)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: UserInfoPagination) => {
        this.userInfo = data;
        this.filteredUsers = data?.userInfo || [];
      });
  }

  filterTeachers(): void {
    const text = this.searchText.toLowerCase();
    if (!text) {
      this.filteredUsers = this.userInfo?.userInfo || [];
      return;
    }
    this.filteredUsers = this.userInfo?.userInfo?.filter(user =>
      (user?.first_name + ' ' + user?.last_name).toLowerCase().includes(text)
    ) || [];
  }
}
