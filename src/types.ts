export interface DuxAction {
  type: string;
  payload?: any;
}

export interface httpClient {
  get?(): any;
  post?(): any;
  put?(): any;
  patch?(): any;
  delete?(): any;
  options?(): any;
  fetch(): any;
}
