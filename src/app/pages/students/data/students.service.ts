import { BASE_URL } from 'src/app/common/common.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  readonly API_MANAGE_STUDENT = '/api/students';

  constructor(private http: HttpClient) { }

  getStudentList(): any {
    const apiUrl = `${BASE_URL}${this.API_MANAGE_STUDENT}`;
    return this.http.get(apiUrl, {});
  }

  getStudentDetailsByStudentId(id: number): any {
    const apiUrl = `${BASE_URL}${this.API_MANAGE_STUDENT}/${id}`;
    return this.http.get(apiUrl, {});
  }

  addStudent(studentData: any) {
    const apiUrl = `${BASE_URL}${this.API_MANAGE_STUDENT}`;
    return this.http.post(apiUrl, studentData);
  }

  editStudent(studentId: number, studentData: any) {
    const apiUrl = `${BASE_URL}${this.API_MANAGE_STUDENT}/${studentId}`;
    return this.http.post(apiUrl, studentData);
  }

  deleteStudent(studentId: number) {
    const apiUrl = `${BASE_URL}${this.API_MANAGE_STUDENT}/${studentId}`;
    return this.http.delete(apiUrl);
  }

}
