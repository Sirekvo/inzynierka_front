import { Component, OnInit } from '@angular/core';
import {PostInput, PostInputByTitle} from "../../../../shared/models/post.model";
import {PostService} from "../../../../shared/services/post.service";
import firebase from "firebase/compat";
import app = firebase.app;
import {UrlInput} from "../../../../shared/models/image.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/services/user.service";
import {resolveUrl} from "ajv/dist/compile/resolve";
import {MustMatch, MustMatch2} from "../../../../shared/match_validator/must_match.validator";

@Component({
    selector: 'app-new-redactor',
    templateUrl: './new-redactor.component.html',
    styleUrls: ['./new-redactor.component.css']
})

/***
 * Blog Component
 */
export class NewRedactorComponent implements OnInit {

    /***
     * Nav bg light calss Add
     */
    navClass = 'bg-white';

    /***
     * Main Slider navigation Add
     */
    showNavigationArrows = true;
    showNavigationIndicators = false;
    postList: Array<PostInput>;
    urlList: Array<UrlInput>;
    newPostList: Array<PostInputByTitle>;
    registerForm: FormGroup;
    submitted = false;
    success = false;
    role: Array<string> = ['redaktor','admin'];
    role_select = this.role[0];
    information_to_user = '';

    constructor(private userService: UserService,
                private formBuilder: FormBuilder,) { }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            role: new FormControl(''),
        }, {
            validators: [MustMatch('password', 'confirmPassword')]
        });
    }
    get fRegister(){
        return this.registerForm.controls;
    }

    registerUser(form){
        this.submitted = true;

        if(this.registerForm.invalid){
            return;
        } else {
            this.userService.existsEmail(form.value.email).subscribe(
                (data: any) => {
                    if(data.exist == false){
                        this.userService.registerUser(form.value.email,form.value.password, form.value.name, form.value.lastName, this.role_select).subscribe(
                            (resolve) => {
                                this.submitted = false;
                                this.success = true;
                                this.information_to_user = '';
                            },
                            () =>{
                                this.information_to_user = '';
                                this.submitted = false;
                            }
                        )
                    } else {
                        this.information_to_user = 'Podany adres e-mail jest już zajęty';
                    }
                }
            )

        }
    }
    selectOptionHandler(event: any) {
        this.role_select = event.target.value;
    }

}
