import { Injectable } from '@angular/core';
import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpHeaders,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpResponse,
    HttpUserEvent,
    HttpErrorResponse,
    HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap, tap } from 'rxjs/operators';
import { DashboardLayoutComponent } from '../../../layout/dashboard-layout/dashboard-layout.component';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class GlobalHttpHeadersInterceptorService implements HttpInterceptor {
    /**
     * Access dashboard layout props.
     */
    private dashboardLayout = DashboardLayoutComponent;

    constructor(private snackbar: MatSnackBar) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<
        HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any
    > {
        request = this.setContentType(request);

        setTimeout(() => (this.dashboardLayout.isRequesting = true));

        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) this.dashboardLayout.isRequesting = false;
            }),
            catchError((error: HttpErrorResponse) => {
                this.dashboardLayout.isRequesting = false;

                switch (error.status) {
                    case 0:
                        this.snackbar.open('Ошибка подключения.');
                        break;
                }

                if (error.status >= 500) {
                    this.snackbar.open(`Ошибка ${error.status}.`);
                }

                return throwError(error);
            })
        );
    }

    /**
     * Set Content-Type header to passed request.
     * @param request Http request to set header.
     */
    private setContentType(request: HttpRequest<any>): HttpRequest<any> {
        if (!(request.body instanceof FormData)) {
            request = request.clone({
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            });
        }

        return request;
    }
}
