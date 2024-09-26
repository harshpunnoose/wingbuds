import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserInfoPagination, UserType } from '../models/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly API_USER_LIST = 'assets/mock/user-info.json';

  constructor(private http: HttpClient) { }

  getUserInfoByType(userType: UserType): Observable<UserInfoPagination> {
    return this.http.get<UserInfoPagination>(this.API_USER_LIST, {
      responseType: 'json',
    }).pipe(map((data: UserInfoPagination) => {
      // Filter the user info based on userType
      const filteredUserInfo = data.userInfo?.filter(info => info.user_type === userType) ?? [];
      return {
        userInfo: filteredUserInfo,
        totalRecord: data?.totalRecord ? data?.totalRecord : 0
      };
    })
    );
  }

}
