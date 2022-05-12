import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from 'src/app/config/constants';

interface RequestOptions {
  headers?: HttpHeaders | {[header: string]: string | string[]},
  observe?: 'body',
  params?: HttpParams|{[param: string]: string | string[]},
  reportProgress?: boolean,
  responseType?: 'json',
  withCredentials?: boolean,
}

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  private apiUrl = this.Constants['API_ENDPOINT'];
  constructor(private http: HttpClient, private Constants: Constants) { }
  get<R>(url: string, options?: RequestOptions) {
    return this.http.get<R>(`${this.apiUrl}${url}`, options);
  }
  post<R>(url: string, data: any, options?: RequestOptions) {
    return this.http.post<R>(`${this.apiUrl}${url}`, data, options);
  }
  put<R>(url: string, data: any, options?: RequestOptions) {
    return this.http.put<R>(`${this.apiUrl}${url}`, data, options);
  }
  delete(url: string, options?: RequestOptions) {
    return this.http.delete(`${this.apiUrl}${url}`, options);
  }
}
