import {Component, OnInit, Type} from '@angular/core';
import {PostInput, PostInputByTitle} from "../../../../shared/models/post.model";
import {PostService} from "../../../../shared/services/post.service";
import firebase from "firebase/compat";
import app = firebase.app;
import {UrlInput} from "../../../../shared/models/image.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/services/user.service";
import {resolveUrl} from "ajv/dist/compile/resolve";
import {MustMatch, MustMatch2} from "../../../../shared/match_validator/must_match.validator";
import {EmailOutput, RedactorOutput} from "../../../../shared/models/user.model";
import {ModalDismissReasons, NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'ngbd-modal-confirm',
    template: `
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">Usuwanie redaktora</h4>
        <button type="button" class="btn-close" aria-describedby="modal-title"
                (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <p><strong>Czy na pewno chcesz usunąć tego redaktora?</strong>
        </p>
          <span class="text-danger">Tej operacji nie można cofnąć.</span>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Anuluj</button>
        <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Potwierdź
        </button>
      </div>
    `
})

export class NgbdModalConfirm {
    constructor(public modal: NgbActiveModal) {
    }
}

const MODALS: { [name: string]: Type<any> } = {
    focusFirst: NgbdModalConfirm,
    // autofocus: NgbdModalConfirmAutofocus
};

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
    information_to_user2 = 'Brak redaktorów';
    mobile = false;
    redactorsList: Array<RedactorOutput>;

    constructor(private userService: UserService,
                private formBuilder: FormBuilder,
                private _modalService: NgbModal) { }

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
        this.userService.getRedactors().subscribe(
            (data: Array<RedactorOutput>) => {
                this.redactorsList = data;
                if(data.length == 0){
                    this.information_to_user2 = 'Brak redaktorów';
                }else {
                    this.information_to_user2 = '';
                }
            }
        )
        if (window.innerWidth <= 991) { // 768px portrait
            this.mobile = true;
        }else{
            this.mobile = false;
        }
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
                (data: EmailOutput) => {
                    if(data.exists == false){
                        this.userService.registerUser(form.value.email,form.value.password, form.value.name, form.value.lastName, this.role_select).subscribe(
                            (resolve) => {
                                this.submitted = false;
                                this.success = true;
                                this.information_to_user = '';
                                this.ngOnInit();
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
    onResize(event) {
        if (event.target.innerWidth <= 991) { // 768px portrait
            this.mobile = true;
        }else{
            this.mobile = false;
        }
    }
    open(name: string, id: number) {
        this._modalService.open(MODALS[name]).result.then((result) => {
            if (result == 'Ok click') {
                this.userService.deleteRedactor(id).subscribe(
                    (result) => {
                        this.ngOnInit();
                    }
                )
            }
        }, (reason) => {
            if (reason === ModalDismissReasons.ESC ||
                reason === ModalDismissReasons.BACKDROP_CLICK ||
                reason == 'cancel click' ||
                reason == 'Cross click') {
            }
        });
    }

}
