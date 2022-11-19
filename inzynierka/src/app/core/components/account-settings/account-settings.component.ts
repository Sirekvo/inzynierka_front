import { Component, OnInit } from '@angular/core';
import {PostInput, PostInputByTitle} from "../../../shared/models/post.model";
import firebase from "firebase/compat";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {resolveUrl} from "ajv/dist/compile/resolve";
import {UserService} from "../../../shared/services/user.service";
import {MustMatch, MustMatch2} from "../../../shared/match_validator/must_match.validator";

@Component({
    selector: 'app-new-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.css']
})

/***
 * Blog Component
 */
export class AccountSettingsComponent implements OnInit {

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
    newPostList: Array<PostInputByTitle>;
    changePasswordForm: FormGroup;
    submitted = false;
    success = false;

    constructor(private userService: UserService,
                private formBuilder: FormBuilder,) { }

    ngOnInit(): void {
        this.changePasswordForm = this.formBuilder.group({
            password: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required]),
        }, {
            validators: [MustMatch('newPassword', 'confirmPassword'),
                MustMatch2('password', 'newPassword')]
        });
    }
    get fChange(){
        return this.changePasswordForm.controls;
    }

    changePassword(form){
        this.submitted = true;

        if(this.changePasswordForm.invalid){
            console.log("nie przechodzi");
            return;
        } else {
            console.log("przechodzi");
            // this.userService.changePassword().subscribe(
            //     (resolve) => {
            //         console.log("succes");
            //         this.submitted = false;
            //         this.success = true;
            //     },
            //     () =>{
            //         this.submitted = false;
            //     }
            // )
        }
    }

}
