import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {TokenOutput} from "../models/user.model";


@Injectable()
export class UserService {

    constructor(handler: HttpBackend,
                private httpClient: HttpClient,
                private httpClient_withoutToken: HttpClient) {
        this.httpClient_withoutToken = new HttpClient(handler);
    }


    setLocalUser(user: TokenOutput, remember: boolean) {
        if (remember || (remember === null && window.sessionStorage.getItem('user') === null)) {
            window.localStorage.setItem('user', JSON.stringify(user));
        } else {
            window.sessionStorage.setItem('user', JSON.stringify(user));
        }
    }

    getLocalUser(): TokenOutput {
        if (window.sessionStorage.getItem('user') === null) {
            return JSON.parse(window.localStorage.getItem('user'));
        } else {
            return JSON.parse(window.sessionStorage.getItem('user'));
        }
    }

    login(email: string, password: string): Observable<TokenOutput> {

        const body = {
            email,
            password
        };

        return this.httpClient.post<TokenOutput>(environment.apiUrl + '/login', body);
    }

    removeLocalUser() {
        if (window.sessionStorage.getItem('user') === null) {
            window.localStorage.removeItem('user');
        } else {
            window.sessionStorage.removeItem('user');
        }
    }

    getToken(): string {
        const user = this.getLocalUser();
        console.log(user.token)
        if (user) {
            return user.token;
        }

        return null;
    }

    registerUser(email: string, password: string, name: string, lastname: string, role: string) {
        const body = {
            email,
            password,
            name,
            lastname,
            role,
        }
        return this.httpClient_withoutToken.post(environment.apiUrl + '/user', body)
    }

    changePassword(account_id: number, password: string): Observable<any> {
        const body = {
            account_id,
            password
        };
        return this.httpClient.put(environment.apiUrl + '/change-password', body);
    }
}
