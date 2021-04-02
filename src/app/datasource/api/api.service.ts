import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpEvent, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Config } from '../config';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UtilsService } from '../utils/utils.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private lconfig;
  public baseURL: string;

  constructor(private http: HttpClient, private UService: UtilsService) {
    const llconfig = new Config();
    this.lconfig = llconfig.get();
  }

  public get(pSegment: string): Observable<any> {
    var vHttpHeaders  = new HttpHeaders();
    const vGetResult = this.http.get(this.lconfig.baseURL + pSegment, {
      headers: vHttpHeaders
    }).pipe(
      catchError(this.handleError)
    );
    return vGetResult;
  }

  public post(pSegment: string, pParams: FormData = new FormData()): Observable<any> {
    const vPost = this.http.post(this.lconfig.baseURL + pSegment, pParams).pipe(
      catchError(this.handleError)
    );
    return vPost;
  }

  public put(pSegment: string, pParams: FormData = new FormData()): Observable<any> {
    const vPost = this.http.put(this.lconfig.baseURL + pSegment, pParams).pipe(
      catchError(this.handleError)
    );
    return vPost;
  }

  public delete(pSegment: string): Observable<any> {
    const vGetResult = this.http.delete(this.lconfig.baseURL + pSegment).pipe(
      catchError(this.handleError)
    );
    return vGetResult;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

}
