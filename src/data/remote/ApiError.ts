export interface ApiError {
  statusCode: number;
  retCode: number;
  retErrMsg: string;
  errDetails: ErrDetail[];
}

export interface ErrDetail {
  errorType: string;
  value: string;
  rawValue: string;
}
