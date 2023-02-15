import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TokenOutput} from "../../shared/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-auth-login',
    templateUrl: './auth-login.component.html',
    styleUrls: ['./auth-login.component.css']
})

/**
 * Auth Login Component
 */
export class AuthLoginComponent implements OnInit {

    information_to_user = '';
    web = true;

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit(): void {
        if (window.innerWidth <= 768) { // 768px portrait
            this.web = false;
        }
    }

    checkUser(form: any) {
        this.userService.login(form.value.email, form.value.password).subscribe(
            (data: TokenOutput) => {
                if(data.token == undefined){
                    this.information_to_user = 'Niepoprawny email lub hasło';
                }
                else{
                    this.userService.setLocalUser(data, form.value.remember === true);
                    this.router.navigate(['/admin'])
                }
            },
            () => {
                this.information_to_user = 'Niepoprawny email lub hasło';
            });
    }
}
