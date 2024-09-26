export interface UserInfo {
  alt_phone: string;
  created_time: number;
  email: string;
  first_name: string;
  id: number;
  last_login_time: number;
  last_name: string;
  parent: string;
  password: string;
  phone: string;
  status: UserStatus;
  updated_by: number;
  updated_time: number;
  user_img: string;
  user_type: UserType;
  username: string;
}

export interface UserInfoPagination {
  userInfo: Array<UserInfo>;
  totalRecord: number;
}

export enum UserType {
  Student = 'S',
  Teacher = 'T',
}

export enum UserStatus {
  Active = 'A',
  Delete = 'D',
  Inactive = 'I',
}
