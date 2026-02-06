export interface SubjectInfo {
  id?: number;
  name?: string;
  code: string;
  description: string;
  status: string;
}

export interface linkData {
  active: boolean;
  label: string;
  url: string;
}

export interface PaginationData {
  current_page: number;
  data: Array<SubjectInfo>;
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

export interface SubjectInfoPagination {
  data: PaginationData;
  success: boolean;
  totalRecord: number;
  subjectInfo: Array<SubjectInfo>;
}
