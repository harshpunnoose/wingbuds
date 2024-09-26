import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard'},
    { title: 'Students', url: '/students'},
    { title: 'Teachers', url: '/teachers'},
    { title: 'Subjects', url: '/subjects'},
    { title: 'Classes', url: '/classes'},
    { title: 'Attendance', url: '/attendance'},
    { title: 'Fees', url: '/fees'},
    { title: 'Salary', url: '/salary'},
  ];
  constructor() {}
}
