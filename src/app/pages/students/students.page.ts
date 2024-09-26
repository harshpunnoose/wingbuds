import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) { }

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
      });
  }

}
