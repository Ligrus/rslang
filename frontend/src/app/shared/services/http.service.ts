import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from 'src/app/config/constants';
import { UrlSerializer } from '@angular/router';

interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

interface UrlParams {
  group?: string;
  page?: string;
  wordsPerPage?: string;
  filter?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  private apiUrl = this.Constants['API_ENDPOINT'];
  constructor(
    private http: HttpClient,
    private Constants: Constants,
    private serializer: UrlSerializer
  ) {}
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
  setUrlParams(urlParams: any) {
    return Object.keys(urlParams).reduce((params, key) => {
      if (urlParams[key] instanceof Object) {
        return params.set(JSON.stringify(key), JSON.stringify(urlParams[key]));
      }
      return params.set(key, urlParams[key]);
    }, new HttpParams());
  }
}
