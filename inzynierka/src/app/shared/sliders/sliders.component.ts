import {Component, OnInit, Input, Type} from '@angular/core';
import {PostInput} from "../models/post.model";
import {PostService} from "../services/post.service";
import {Router} from "@angular/router";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {ModalDismissReasons, NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SliderEditorComponent} from "../../core/components/admin-settings/slider-editor/slider-editor.component";
import {UrlInput} from "../models/image.model";

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
    selector: 'app-sliders',
    templateUrl: './sliders.component.html',
    styleUrls: ['./sliders.component.css']
})
export class SlidersComponent implements OnInit {

    @Input() urlList: Array<{
        url: string;
        slider_id: number;
    }>;


    isVisible = true;
    isVisibleEdit= false;
    url_id: number;
    imgSrc : string;
    downloadUrl: string;
    tmpUrl: string;
    task: AngularFireUploadTask;
    selectedImage : any = null;
    // postList: Array<PostInput>;



    constructor(private postService: PostService,
                private router: Router,
                private af:AngularFireStorage,
                private _modalService: NgbModal,
                private slider: SliderEditorComponent,
                ) { }

    ngOnInit(): void {


        // this.postService.getPost().subscribe(
        //     (post: Array<PostInput>) => {
        //       this.postList = post;
        //     },
        //     () => {
        //     }
        //
        // );
    }
    counter(i : number){
        return new Array(i);
    }
    back_to_start(){
        if(this.tmpUrl != this.downloadUrl){
            this.af.refFromURL(this.downloadUrl).delete();
        }
        this.isVisible = true;
        this.isVisibleEdit = false;
        this.downloadUrl = '';
    }
    open(name: string, id: number, url: string) {
        this._modalService.open(MODALS[name]).result.then((result) => {
            if (result == 'Ok click') {
                this.postService.deleteSlider(id).subscribe(
                    (resolve) => {
                        this.af.refFromURL(url).delete();
                        this.slider.ngOnInit();
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
    edit(id: number, url_id: number){
        this.isVisible=false;
        this.isVisibleEdit = true;
        this.url_id = url_id;
        this.downloadUrl = this.urlList[id].url;
        this.tmpUrl = this.urlList[id].url;

    }

    async uploadImages() {
        const filePath = `Sliders/${this.imgSrc['name']}`;
        const fileRef = this.af.ref(filePath);
        // this.af.upload("/files"+Math.random()+this.imgSrc,this.imgSrc)
        this.task = this.af.upload(filePath, this.imgSrc);
        (await this.task).ref.getDownloadURL().then(url => {
            this.downloadUrl = url
        });
    }
    handleFiles($event){
        this.imgSrc = $event.target.files[0];
    }
    submit(){
        if(this.downloadUrl != this.tmpUrl){
            this.postService.editSlider(this.downloadUrl,this.url_id).subscribe(
                (resolve) => {
                    this.af.refFromURL(this.tmpUrl).delete();
                    this.isVisibleEdit = false;
                    this.isVisible = true;
                    this.downloadUrl = '';
                    this.slider.ngOnInit();
                }
            )
        }else{
            this.isVisibleEdit = false;
            this.isVisible = true;
            this.downloadUrl = '';
        }

    }
    showPreview(event: any){
        if(event.target.files && event.target.files[0]){
            const reader = new FileReader();
            reader.onload = (e:any) => this.imgSrc = e.target.result;
            reader.readAsDataURL(event.target.files[0]);
            this.selectedImage = event.target.files[0];
        }
        else{
            this.selectedImage = null;
        }
    }
    show(position: number, index: number){
        console.log(position);
        console.log(index);
        if(position==2 && index == 0){
            var tmp = this.urlList[0];
            this.urlList[0] = this.urlList[1];
            this.urlList[1] = tmp
            this.postService.sendSliderUrl(this.urlList).subscribe(
                (resolve) =>{
                    this.ngOnInit();
                }
            )
        } else if(position == 3 && index == 0){
            var tmp = this.urlList[0];
            this.urlList[0] = this.urlList[2];
            this.urlList[2] = tmp
            this.postService.sendSliderUrl(this.urlList).subscribe(
                (resolve) =>{
                    this.ngOnInit();
                }
            )
        }else if(position == 1 && index == 1){
            var tmp = this.urlList[1];
            this.urlList[1] = this.urlList[0];
            this.urlList[0] = tmp
            this.postService.sendSliderUrl(this.urlList).subscribe(
                (resolve) =>{
                    this.ngOnInit();
                }
            )
        } else if(position == 3 && index == 1){
            var tmp = this.urlList[1];
            this.urlList[1] = this.urlList[2];
            this.urlList[2] = tmp
            this.postService.sendSliderUrl(this.urlList).subscribe(
                (resolve) =>{
                    this.ngOnInit();
                }
            )
        }else if(position == 1 && index == 2){
            var tmp = this.urlList[2];
            this.urlList[2] = this.urlList[0];
            this.urlList[0] = tmp
            this.postService.sendSliderUrl(this.urlList).subscribe(
                (resolve) =>{
                    this.ngOnInit();
                }
            )
        }else if(position == 2 && index == 2){
            var tmp = this.urlList[2];
            this.urlList[2] = this.urlList[1];
            this.urlList[1] = tmp
            this.postService.sendSliderUrl(this.urlList).subscribe(
                (resolve) =>{
                    this.ngOnInit();
                }
            )
        }

    }
}
