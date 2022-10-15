import {AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ChangeFormStatusInput, FormListItemOutput, FormStatus} from '../../../models/form.model';
import {FormService} from '../../../services/form.service';
import {LayoutService} from '../../../services/layout.service';
import {ToastService} from '../../../services/toast.service';

@Component({
    selector: 'app-form-list',
    templateUrl: './form-list.component.html',
    styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('buttonBarTemplate', {static: false}) buttonBarTemplate: TemplateRef<any>;

    isEditOpen = false;

    forms: Array<FormListItemOutput>;
    isWarningOpen = false;
    selectedFormIdToDelete: bigint;
    private deleteSuccessBody: string;
    private deleteSuccessTitle: string;

    searchTerm = '';

    constructor(private formService: FormService,
                private layoutService: LayoutService,
                private router: Router,
                private toastService: ToastService,
                private translateService: TranslateService) {
    }

    ngOnInit() {
        this.layoutService.showLoading();
        this.formService.getForms()
            .subscribe(
                (forms: Array<FormListItemOutput>) => {
                    this.layoutService.hideLoading();
                    this.forms = forms;
                },
                () => {
                    this.layoutService.hideLoading();
                    this.toastService.error();
                }
            );

        this.translateService.get('Forms.DeleteFormSuccessTitle')
            .subscribe(label => this.deleteSuccessTitle = label);

        this.translateService.get('Forms.DeleteFormSuccessBody')
            .subscribe(label => this.deleteSuccessBody = label);
    }

    ngAfterViewInit() {
        this.layoutService.setButtonBar(this.buttonBarTemplate);
    }

    ngOnDestroy() {
        this.layoutService.clearButtonBar();
    }

    onEditClick(id: bigint) {
        this.router.navigate(['/forms/editor/' + id]);
    }

    onChangeStatus(form: FormListItemOutput, status: FormStatus) {
        form.status = status;

        const model = new ChangeFormStatusInput();
        model.id = form.id;
        model.status = status;

        this.formService.changeFormStatus(model).subscribe(
            () => {
            },
            () => {
                this.toastService.error();
            });
    }

    onSetDefault(form: FormListItemOutput) {
        this.forms.forEach(x => x.isDefault = false);
        form.isDefault = true;

        this.formService.setDefaultForm(form.id)
            .subscribe(
                () => {
                },
                () => {
                    this.toastService.error();
                }
            );
    }

    onDeleteClick(formId: bigint) {
        this.isWarningOpen = true;
        this.selectedFormIdToDelete = formId;
    }

    onDeleteConfirmed() {
        this.layoutService.showLoading();
        this.formService.deleteForm(this.selectedFormIdToDelete)
            .subscribe(
                () => {
                    this.layoutService.hideLoading();
                    this.forms = this.forms.filter(x => x.id !== this.selectedFormIdToDelete);
                    this.toastService.success(this.deleteSuccessTitle, this.deleteSuccessBody);
                },
                () => {
                    this.layoutService.hideLoading();
                    this.toastService.error();
                }
            );
    }
}
