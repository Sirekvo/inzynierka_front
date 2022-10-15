import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {TokenOutput, UserRole} from '../../../models/user.model';
import {LayoutService} from '../../../services/layout.service';

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

    errorMessage = '';
    isFormDisabled = false;
    redirectUrl = null;

    constructor(private userService: UserService,
                private router: Router,
                private layoutService: LayoutService,
                activatedRoute: ActivatedRoute) {

        activatedRoute.queryParams.subscribe(params => {
            this.redirectUrl = params['redirectUrl'];
        });
    }

    ngOnInit() {
        this.userService.removeLocalUser();
    }

    onLogin(form: NgForm) {
        this.layoutService.showAppLoading();
        this.errorMessage = '';
        this.isFormDisabled = true;

        this.userService.login(form.value.email, form.value.password).subscribe(
            (data: TokenOutput) => {
                this.userService.setLocalUser(data, form.value.remember === true);

                if (this.redirectUrl) {
                    this.router.navigate([this.redirectUrl]);
                } else if (data.role === UserRole.SuperAdmin) {
                    this.router.navigate(['../super-login']);
                } else {
                    this.router.navigate(['..']);
                }

                this.layoutService.hideAppLoading();
            },
            (response: HttpErrorResponse) => {
                if (response.status === 400) {
                    this.errorMessage = response.error;
                }
                this.isFormDisabled = false;
                this.layoutService.hideAppLoading();
            });
    }
}
