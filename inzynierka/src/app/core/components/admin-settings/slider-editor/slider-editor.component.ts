import {Component, Injectable, OnInit} from '@angular/core';
import {PostInput, PostInputByTitle} from "../../../../shared/models/post.model";
import {PostService} from "../../../../shared/services/post.service";
import firebase from "firebase/compat";
import app = firebase.app;
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {UrlInput} from "../../../../shared/models/image.model";
import {SlidersComponent} from "../../../../shared/sliders/sliders.component";
import {Router} from "@angular/router";

@Component({
    selector: 'app-slider-editor',
    templateUrl: './slider-editor.component.html',
    styleUrls: ['./slider-editor.component.css']
})
@Injectable({
    providedIn: 'root',
})
export class SliderEditorComponent implements OnInit {

    /***
     * Nav bg light calss Add
     */
    navClass = 'bg-white';

    imgSrc : string;
    selectedImage : any = null;
    isSubmitted : boolean;
    downloadUrl: string;
    showNavigationArrows = true;
    showNavigationIndicators = false;
    task: AngularFireUploadTask;
    urlList: Array<UrlInput>;
    newPostList: Array<PostInputByTitle>;
    isVisible= true;
    isVisibleAddSlider= false;
    information_to_user= '';
    slidersCount: number;
     sliderList: Array<UrlInput>;


    constructor(private postService: PostService,
                private af:AngularFireStorage,
                private router: Router) { }

    ngOnInit(): void {
        this.postService.getSliderUrl().subscribe(
            (url: Array<UrlInput>) => {
                this.urlList = url;
                this.slidersCount= url.length;
            },
            () => {
            }

        );

    }
    show_add_slider(){
        if(this.slidersCount<3){
            this.isVisible = false;
            this.isVisibleAddSlider = true;
        }
        else{
            this.information_to_user = 'Możesz dodać maksymalnie 3 slidery';
        }
    }

    async uploadImages() {
        const filePath = `Sliders/${this.imgSrc['name']}`;
        const fileRef = this.af.ref(filePath);
        this.task = this.af.upload(filePath, this.imgSrc);
        (await this.task).ref.getDownloadURL().then(url => {
            this.downloadUrl = url
        });
    }
    handleFiles($event){
        this.imgSrc = $event.target.files[0];
    }
    submit(){
        const slider = new UrlInput();
        slider.url = this.downloadUrl;
        this.urlList.push(slider);
        this.postService.sendSliderUrl(this.urlList).subscribe(
            (resolve) =>{
                this.isVisibleAddSlider = false;
                this.isVisible = true;
                this.downloadUrl = '';
                this.ngOnInit();
        }

        )
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
    back_to_start(){
        this.isVisibleAddSlider = false;
        this.isVisible = true;
        this.downloadUrl = '';
    }
}
