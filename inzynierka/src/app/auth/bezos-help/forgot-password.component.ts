import {Component} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
    templateUrl: 'forgot-password.component.html'
})
export class ForgotPasswordComponent {

    errorMessage = '';
    isFormDisabled = false;

    constructor(private userService: UserService,
                private router: Router) {
    }

    onForgotPassword(form: NgForm) {
        this.errorMessage = '';
        this.isFormDisabled = true;

        this.userService.forgotPassword(form.value.email).subscribe(
            () => {
            },
            (response: HttpErrorResponse) => {
                if (response.status === 400) {
                    this.errorMessage = response.error;
                }
                this.isFormDisabled = false;
            });
    }
}
