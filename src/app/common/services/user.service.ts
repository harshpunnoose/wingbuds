import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserInfo, UserInfoPagination, UserType } from '../models/user-info';
import { BASE_URL } from '../common.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly API_USER_LIST = 'assets/mock/user-info.json';
  readonly API_MANAGE_STUDENT = '/api/students';

  constructor(private http: HttpClient) { }

  getUserInfoByType(userType: UserType): Observable<UserInfoPagination> {
    return this.http.get<UserInfoPagination>(this.API_USER_LIST, {
      responseType: 'json',
    }).pipe(map((data: UserInfoPagination) => {
      // Filter the user info based on userType
      // const filteredUserInfo = data.userInfo?.filter(info => info?.user_type === userType) ?? [];
      // const filteredUserInfo = data.userInfo ?? [];
      // return {
      //   userInfo: filteredUserInfo,
      //   totalRecord: data?.totalRecord ? data?.totalRecord : 0
      // };
      return data;
    })
    );
  }



  // addUser(user: any) {
  //   console.log('harsh user = ', user);
  //   const apiUrl = `${BASE_URL}${this.API_MANAGE_STUDENT}`;
  //   return this.http.post(apiUrl, user);
  // }


}
