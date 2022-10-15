import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {
    CompanyOutput,
    CreateUserInput,
    TokenOutput, UpdateCompanyInput,
    UpdateUserInput,
    UserListItemOutput,
    UserOutput,
    UserRole
} from '../models/user.model';

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) {
    }

    registerUser(fullName: string, url: string, email: string, password: string, phoneNumber: string): Observable<any> {

        const body = {
            fullName,
            url,
            email,
            password,
            phoneNumber
        };

        return this.httpClient.post(environment.apiUrl + 'users/register', body);
    }

    forgotPassword(email: string): Observable<any> {

        const body = {
            email
        };

        return this.httpClient.post(environment.apiUrl + 'users/password/forgot', body);
    }

    resetPassword(userId: string, resetToken: string, newPassword: string): Observable<any> {

        const body = {
            userId,
            resetToken,
            newPassword
        };

        return this.httpClient.post(environment.apiUrl + 'users/password/reset', body);
    }

    create(model: CreateUserInput): Observable<string> {
        return this.httpClient.post(environment.apiUrl + 'users', model, {responseType: 'text'});
    }

    update(model: UpdateUserInput): Observable<string> {
        return this.httpClient.put(environment.apiUrl + 'users', model, {responseType: 'text'});
    }

    updateMe(model: UpdateUserInput): Observable<string> {
        return this.httpClient.put(environment.apiUrl + 'users/me', model, {responseType: 'text'});
    }

    updateCompany(model: UpdateCompanyInput): Observable<number> {
        return this.httpClient.put<number>(environment.apiUrl + 'users/company', model);
    }

    delete(id: string): Observable<string> {
        return this.httpClient.delete(environment.apiUrl + 'users/' + id, {responseType: 'text'});
    }

    get(id: string): Observable<UserOutput> {
        return this.httpClient.get<UserOutput>(environment.apiUrl + 'users/' + id);
    }

    getMe(): Observable<UserOutput> {
        return this.httpClient.get<UserOutput>(environment.apiUrl + 'users/me');
    }

    getCompany(): Observable<CompanyOutput> {
        return this.httpClient.get<CompanyOutput>(environment.apiUrl + 'users/company');
    }

    getUsers(): Observable<Array<UserListItemOutput>> {
        return this.httpClient.get<Array<UserListItemOutput>>(environment.apiUrl + 'users');
    }

    login(email: string, password: string): Observable<TokenOutput> {

        const body = {
            email,
            password
        };

        return this.httpClient.post<TokenOutput>(environment.apiUrl + 'users/token', body);
    }

    loginAsUser(email: string): Observable<TokenOutput> {

        const body = {
            email
        };

        return this.httpClient.post<TokenOutput>(environment.apiUrl + 'users/token/super', body);
    }

    refreshToken(): Observable<TokenOutput> {

        const user = this.getLocalUser();

        const body = {
            token: user.refreshToken
        };

        return this.httpClient.post<TokenOutput>(environment.apiUrl + 'users/token/refresh', body);
    }

    logout(): Observable<any> {

        const user = this.getLocalUser();

        const body = {
            token: user.refreshToken
        };

        return this.httpClient.post(environment.apiUrl + 'users/signout', body);
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

    removeLocalUser() {
        if (window.sessionStorage.getItem('user') === null) {
            window.localStorage.removeItem('user');
        } else {
            window.sessionStorage.removeItem('user');
        }
    }

    isAuthenticated(): boolean {
        const user = this.getLocalUser();
        return user !== null;
    }

    isSuperAdmin(): boolean {
        const user = this.getLocalUser();
        return user !== null && user.role === UserRole.SuperAdmin;
    }

    isRegularUser(): boolean {
        const user = this.getLocalUser();
        return user !== null && user.role === UserRole.User;
    }

    hasBasicPlan(): boolean {
        const user = this.getLocalUser();
        return user.plan.startsWith('Basic');
    }

    isPaymentRequired(): boolean {
        const user = this.getLocalUser();
        return Date.parse(user.planExpiredOn) <= Date.now();
    }

    getRemainingPlanDays(): number {
        const user = this.getLocalUser();
        return Math.ceil((Date.parse(user.planExpiredOn) - Date.now()) / (1000 * 60 * 60 * 24));
    }

    getToken(): string {
        const user = this.getLocalUser();

        if (user) {
            return user.accessToken;
        }

        return null;
    }

    getCulture(): string {
        const nav: any = window.navigator;

        if (nav.languages) {
            return nav.languages[0];
        } else {
            return nav.userLanguage || nav.language;
        }
    }

    getLanguage(): string {
        return this.getCulture().split('-')[0];
    }

    getCountryCode(): string {
        const language = this.getCulture().split('-');
        if (language.length > 1) {
            return language[1];
        }
        return language[0];
    }
}
