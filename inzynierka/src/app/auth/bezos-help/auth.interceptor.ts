import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import {UserService} from '../services/user.service';
import {ErrorObservable} from 'rxjs-compat/observable/ErrorObservable';
import {TokenOutput} from '../models/user.model';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    isRefreshing = false;
    refreshTokenSubject = new BehaviorSubject<string>(null);
    userService: UserService;

    constructor(private injector: Injector, private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!this.userService) {
            this.userService = this.injector.get(UserService);
        }

        const user = this.userService.getLocalUser();

        if (user === null || req.url.includes('assets')
            || req.url.includes('signout') || req.url.includes('token/refresh')) {
            return next.handle(this.addCultureHeader(req));
        }

        if (this.isRefreshing) {
            return this.refreshTokenSubject
                .filter(result => result !== null)
                .take(1)
                .switchMap(() => next.handle(this.addHeaders(req)));
        }

        const expires = Date.parse(user.expires);

        // console.log((expires - Date.now()) / 1000 / 60);

        if (expires <= Date.now()) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.userService.refreshToken().mergeMap(
                (data: TokenOutput) => {
                    this.userService.setLocalUser(data, null);

                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(data.accessToken);

                    return next.handle(this.addHeaders(req));
                })
                .catch(error => {
                    console.log(error);

                    this.userService.removeLocalUser();
                    this.router.navigate(['/login']);

                    this.isRefreshing = false;
                    return ErrorObservable.create(error);
                });
        }

        return next.handle(this.addHeaders(req));
    }

    addHeaders(req: HttpRequest<any>) {
        return req.clone({
            headers: req.headers
                .set('Authorization', 'Bearer ' + this.userService.getToken())
                .set('Culture', this.userService.getCulture())
        });
    }

    addCultureHeader(req: HttpRequest<any>) {
        return req.clone({
            headers: req.headers
                .set('Culture', this.userService.getCulture())
        });
    }
}
