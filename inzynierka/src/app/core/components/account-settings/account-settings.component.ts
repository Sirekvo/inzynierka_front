import {Component, OnInit, Type} from '@angular/core';
import {PostInput, PostInputByTitle} from "../../../shared/models/post.model";
import firebase from "firebase/compat";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {resolveUrl} from "ajv/dist/compile/resolve";
import {UserService} from "../../../shared/services/user.service";
import {MustMatch, MustMatch2} from "../../../shared/match_validator/must_match.validator";
import {AccountOutput} from "../../../shared/models/user.model";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'ngbd-modal-confirm',
    template: `
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">Usuwanie konta</h4>
        <button type="button" class="btn-close" aria-describedby="modal-title"
                (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <p><strong>Czy na pewno chcesz usunąć swój profil z <span class="text-primary">Teczki Życia</span> ?</strong>
        </p>
        <p>Wszystkie informacje przypisane do tego konta zostaną usunięte.
          <span class="text-danger">Tej operacji nie można cofnąć.</span>
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Anuluj</button>
        <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')" click="deleteUser()">Potwierdź
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
    changeDataForm: FormGroup;
    submitted = false;
    submitted_data = false;
    showSuccessPassword = false;
    showSuccessName = false;
    account_id: number;
    email: string;
    name: string;
    lastname: string;
    role: string;
    information_to_user = '';
    information_to_user2 = '';
    mobile = false;

    constructor(private userService: UserService,
                private formBuilder: FormBuilder,
                private router: Router,
                private _modalService: NgbModal) { }

    ngOnInit(): void {
        this.changePasswordForm = this.formBuilder.group({
            password: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required]),
        }, {
            validators: [MustMatch('newPassword', 'confirmPassword'),
                MustMatch2('password', 'newPassword')]
        });
        this.changeDataForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            lastname: new FormControl('', [Validators.required]),
        }, {});

        this.userService.getInformationAboutUser().subscribe(
            (information: AccountOutput) => {
                this.account_id = information.account_id;
                this.email = information.email;
                this.name = information.name;
                this.lastname = information.lastname;
                this.role = information.role;
                this.changeDataForm.controls['email'].setValue(this.email);
                this.changeDataForm.controls['name'].setValue(this.name);
                this.changeDataForm.controls['lastname'].setValue(this.lastname);
            }
        )
        if (window.innerWidth <= 991) { // 768px portrait
            this.mobile = true;
        }else{
            this.mobile = false;
        }
    }
    get fChangePassword(){
        return this.changePasswordForm.controls;
    }
    get fChangeData(){
        return this.changeDataForm.controls;
    }

    changePassword(form){
        this.submitted = true;
        this.information_to_user = '';
        if(this.changePasswordForm.invalid){
            return;
        } else {
            this.userService.changePassword(form.value.password, form.value.newPassword).subscribe(
                (resolve) => {
                    form.reset();
                    this.submitted = false;
                    this.information_to_user = '';
                    this.showSuccessPassword = true;
                },
                () =>{
                    this.information_to_user = 'Stare hasło nie jest prawidlowe';
                    form.reset();
                    this.submitted = false;
                }
            )
        }
    }
    onResize(event) {
        if (event.target.innerWidth <= 991) { // 768px portrait
            this.mobile = true;
        }else{
            this.mobile = false;
        }
    }
    changeData(form){
        this.submitted_data = true;

        if(this.changeDataForm.invalid){
            return;
        }
        else{
            this.userService.changeInformation(form.value.email, form.value.name, form.value.lastname).subscribe(
                (result: any) => {
                    form.reset();
                    this.submitted_data = false;
                    this.showSuccessName = true;
                    this.ngOnInit();
                }
            )
        }
     }
    open(name: string) {
        this._modalService.open(MODALS[name]).result.then((result) => {
            if (result == 'Ok click') {
                this.deleteUser();
                //   this.userService.deleteUser();

            }
        }, (reason) => {
            if (reason === ModalDismissReasons.ESC ||
                reason === ModalDismissReasons.BACKDROP_CLICK ||
                reason == 'cancel click' ||
                reason == 'Cross click') {
            }
        });
    }
    deleteUser() {
        this.userService.deleteUser(this.account_id).subscribe(
            (data: any) => {
                this.logout();
                this.router.navigate(['/login']);
            },
            response => {
            });
    }
    logout(){
        this.userService.removeLocalUser();
    }

}
