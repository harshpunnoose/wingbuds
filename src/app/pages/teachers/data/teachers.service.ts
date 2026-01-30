import { BASE_URL } from 'src/app/common/common.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  readonly API_MANAGE_TEACHER = '/api/teachers';

  constructor(private http: HttpClient) { }

  getTeacherList(): any {
    const apiUrl = `${BASE_URL}${this.API_MANAGE_TEACHER}`;
    return this.http.get(apiUrl, {});
  }

  getTeacherDetailsByTeacherId(teacherId: number): any {
    const apiUrl = `${BASE_URL}${this.API_MANAGE_TEACHER}/${teacherId}`;
    return this.http.get(apiUrl, {});
  }

  addTeacher(teacherData: any) {
    const apiUrl = `${BASE_URL}${this.API_MANAGE_TEACHER}`;
    return this.http.post(apiUrl, teacherData);
  }

  editTeacher(teacherId: number, teacherData: any) {
    const apiUrl = `${BASE_URL}${this.API_MANAGE_TEACHER}/${teacherId}`;
    return this.http.post(apiUrl, teacherData);
  }

  deleteTeacher(teacherId: number) {
    const apiUrl = `${BASE_URL}${this.API_MANAGE_TEACHER}/${teacherId}`;
    return this.http.delete(apiUrl);
  }

}
