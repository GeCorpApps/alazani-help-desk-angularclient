import { Injectable } from '@angular/core';
import {
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';

@Injectable()
export class ApiLoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    constructor(private loaderService: LoaderService, private router: Router) { }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.isLoading.next(this.requests.length > 0);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(req);
        this.loaderService.isLoading.next(true);
        return Observable.create(observer => {
            const subscription = next.handle(req)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(req);
                            observer.next(event);
                            next.handle(req)
                        }
                    },
                    err => {
                        if(err.status == 401 && err.error.status == false){
                            this.removeRequest(req);
                            observer.complete();
                        }else if(err.status == 400 && err.error.status == false){
                            alert(err.error.result);
                        } else if(err.status == 500) {
                            alert(err.error.detail);
                        } else{
                            alert('error returned');
                            observer.error(err);
                        }
                    },
                    () => {
                        this.removeRequest(req);
                        observer.complete();
                    });
            // remove request from queue when cancelled
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }
}
