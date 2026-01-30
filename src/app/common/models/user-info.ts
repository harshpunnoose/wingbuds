export interface linkData {
  active: boolean;
  label: string;
  url: string;
}
export interface PaginationData {
  current_page: number;
  data: Array<UserInfo>;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<linkData>;
  next_page_url: string;
  path: string;
  per_page: string;
  prev_page_url: string;
  to: number;
  total: number;
}
export interface UserInfo {
  alt_phone: string;
  created_at: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  parent: string;
  phone: string;
  status: string;
  updated_at: string;
  user_id: number;
  user_img: string;
  username: string;
}

export interface UserInfoPagination {
  data: PaginationData;
  success: boolean;
  totalRecord: number;
  userInfo: Array<UserInfo>;
}

export interface UserData {
  data: UserInfo;
  success: boolean;
}

export enum UserType {
  Student = 'S',
  Teacher = 'T',
}


