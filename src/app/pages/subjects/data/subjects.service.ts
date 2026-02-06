import { BASE_URL } from 'src/app/common/common.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  readonly API_MANAGE_SUBJECT = '/api/subjects';

  constructor(private http: HttpClient) { }

  getSubjectList(): any {
    const apiUrl = `${BASE_URL}${this.API_MANAGE_SUBJECT}`;
    return this.http.get(apiUrl, {});
  }

  getSubjectDetailsBySubjectId(id: number): any {
    const apiUrl = `${BASE_URL}${this.API_MANAGE_SUBJECT}/${id}`;
    return this.http.get(apiUrl, {});
  }

  addSubject(subjectData: any) {
    const apiUrl = `${BASE_URL}${this.API_MANAGE_SUBJECT}`;
    return this.http.post(apiUrl, subjectData);
  }

  editSubject(subjectId: number, subjectData: any) {
    const apiUrl = `${BASE_URL}${this.API_MANAGE_SUBJECT}/${subjectId}`;
    return this.http.post(apiUrl, subjectData);
  }

  deleteSubject(subjectId: number) {
    const apiUrl = `${BASE_URL}${this.API_MANAGE_SUBJECT}/${subjectId}`;
    return this.http.delete(apiUrl);
  }

}
