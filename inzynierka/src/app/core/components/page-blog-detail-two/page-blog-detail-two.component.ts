import { Component, OnInit, Type } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';
import {PostInput, PostOutput} from "../../../shared/models/post.model";
import {PostService} from "../../../shared/services/post.service";
import {delay, finalize} from "rxjs/operators";
import {ImageService} from "../../../shared/services/image.service";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {ModalDismissReasons, NgbActiveModal, NgbDate, NgbDateStruct, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import * as _ from 'lodash';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AccountOutput} from "../../../shared/models/user.model";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
      <div class="modal-header">
        <label>Dodaj zdjęcie</label>
        <input type="file" (change)="handleFiles($event)" accept="*.png.jpg.jpeg">
        <button class="btn btn-primary" (click)="uploadImages()">Upload Image</button>
      </div>
      <div class="modal-body">
        <img [src]="downloadUrl">
        <br />
        {{downloadUrl}}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Anuluj</button>
        <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')" click="deleteUser()">Potwierdź
        </button>
      </div>
    `
})

export class NgbdModalConfirm {
  selectedImage : any = null;
  imgSrc : string;

  files: any = [];
  downloadUrl= '';
  url;
  task: AngularFireUploadTask;

  isSubmitted : boolean;
  // formTemplate: FormGroup<{
  //   imageUrl: FormControl<''>;
  //   caption: FormControl<''>;
  //   category: FormControl<''> }>;

  constructor(public modal: NgbActiveModal,
              private af: AngularFireStorage) {
  }
  handleFiles($event){
    this.imgSrc = $event.target.files[0];
    const file=$event[1];
    console.log(file);

  }
  async uploadImages() {
    console.log(this.imgSrc);
    // this.postList.map(t => t.series_id)
    const filePath = `Images/${this.imgSrc['name']}`;
    console.log(filePath);
    const fileRef = this.af.ref(filePath);
    // this.af.upload("/files"+Math.random()+this.imgSrc,this.imgSrc)
    this.task = this.af.upload(filePath, this.imgSrc);
    (await this.task).ref.getDownloadURL().then(url => {this.downloadUrl = url
      console.log(this.downloadUrl);
    });
    // task.snapshotChanges().pipe(
    //     finalize(() => {
    //       this.downloadUrl = fileRef.getDownloadURL()
    //       console.log(this.downloadUrl);
    //       this.downloadUrl.subscribe(url => {
    //         if(this.url){
    //           this.url = url
    //           // this.files.push(this.file)
    //         }
    //       })
    //     })
    // ).subscribe();
    // console.log(this.files);
    console.log(this.downloadUrl);
  }

  showPreview(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = "assets/images/blog/add_photo.jpg";
      this.selectedImage = null;
    }
  }
  resetForm(){
    this.imgSrc = "assets/images/blog/add_photo.jpg";
    this.isSubmitted = false;
    this.selectedImage = null;

    // this.postService.getPost().subscribe(
    //     (post: Array<PostInput>) => {
    //       this.postList = post;
    //       this.postCounter = this.postList.length;
    //     },
    //     () => {
    //     }
    //
    // );
    // this.lastPostId = this.postList.map(t => t.series_id);

  }
}

const MODALS: { [name: string]: Type<any> } = {
  focusFirst: NgbdModalConfirm,
  // autofocus: NgbdModalConfirmAutofocus
};

@Component({
  selector: 'app-page-blog-detail-two',
  templateUrl: './page-blog-detail-two.component.html',
  styleUrls: ['./page-blog-detail-two.component.css']
})

/**
 * page Blog-Detail-Two Component
 */
export class PageBlogDetailTwoComponent implements OnInit {

  /**
   * Nav Light Class Add
   */
  navClass = 'nav-light';
  imgSrc : string;
  selectedImage : any = null;
  isSubmitted : boolean;
  model: NgbDateStruct;
  date = new Date();
  check = true;

  genres: Array<string> = ['Komedia', 'Dramat', 'Romantyczny', 'Science fiction', 'Kryminalny', 'Fantasy', 'Wojenny', 'Horror'];
  genresSelected = this.genres[0];

  // formTemplate = new FormGroup({
  //   id: new FormControl(''),
  //   imageUrl : new FormControl(''),
  // })

  postList: Array<PostInput>;
  postCounter: number;
  lastPostId: number[];
  imageUrl: string;
  downloadUrl: string;
  task: AngularFireUploadTask;
  name: string;
  lastname: string;


  constructor(private postService: PostService,
              private af:AngularFireStorage,
              private imageService: ImageService,
              private _modalService: NgbModal,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.resetForm();
    this.userService.getInformationAboutUser().subscribe(
        (information: AccountOutput) => {
          this.name = information.name;
          this.lastname = information.lastname;
        }
    )
    const now = new Date();
    this.model = new NgbDate(now.getFullYear(),now.getMonth(),now.getDate());

  }

  async uploadImages() {
    console.log(this.imgSrc);
    // this.postList.map(t => t.series_id)
    const filePath = `Images/${this.imgSrc['name']}`;
    console.log(filePath);
    const fileRef = this.af.ref(filePath);
    // this.af.upload("/files"+Math.random()+this.imgSrc,this.imgSrc)
    this.task = this.af.upload(filePath, this.imgSrc);
    (await this.task).ref.getDownloadURL().then(url => {
      this.downloadUrl = url
    });
  }
  handleFiles($event){
    this.imgSrc = $event.target.files[0];
    const file=$event[1];
    console.log(file);

  }
  // async onSubmit(form: any) {
   onSubmit = async (form: any) =>{
    const new_date = form.value.premiere.year + "-" + form.value.premiere.month + "-" + form.value.premiere.day;
    const post_creator = this.name + ' ' + this.lastname;
    const now = new Date();
    const creation_date = now.getDate() + '.' + now.getMonth() + '.' + now.getFullYear();;

    this.check=false;
    this.postService.createPost(form.value.title, form.value.creator, form.value.genre, form.value.production, new_date, form.value.description, this.downloadUrl, post_creator, creation_date).subscribe(
       (response: any) => {
         this.router.navigate(['/admin'])
         this.resetForm();
         form.reset();
       },
       () => {
         this.check=false;

       }
    );


    this.isSubmitted = true;

    // var filePath = `${this.postList.map(t => t.series_id)[this.postList.length-1]+1}/${this.selectedImage.name}_${new Date().getTime()}`;
    // const fileRef = this.storage.ref(filePath);
    // this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
    //     finalize(()=>{
    //       fileRef.getDownloadURL().subscribe((url)=>{
    //         this.imageUrl=url;
    //         this.imageService.insertImageDatails(this.imageUrl);
    //         this.resetForm();
    //       })
    //     })
    // ).subscribe();
  }

  showPreview(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = "assets/images/blog/add_photo.jpg";
      this.selectedImage = null;
    }
  }
  open(name: string) {
    this._modalService.open(MODALS[name]).result.then((result) => {
      if (result == 'Ok click') {
        this.downloadUrl = 'https://firebasestorage.googleapis.com/v0/b/inzynierka-8fde0.appspot.com/o/Images%2Fturbulencje.jpg?alt=media&token=d82eccbc-99ed-44d3-a747-f1e78c0cffee'
      }
    }, (reason) => {
      if (reason === ModalDismissReasons.ESC ||
          reason === ModalDismissReasons.BACKDROP_CLICK ||
          reason == 'cancel click' ||
          reason == 'Cross click') {
      }
    });
  }
  resetForm(){
    this.imgSrc = "assets/images/blog/add_photo.jpg";
    this.isSubmitted = false;
    this.selectedImage = null;
    this.downloadUrl = '';


    this.postService.getPost().subscribe(
          (post: Array<PostInput>) => {
            this.postList = post;
            this.postCounter = this.postList.length;
          },
          () => {
          }

        );
    // this.lastPostId = this.postList.map(t => t.series_id);

  }
  back() {
    if(this.downloadUrl != ''){
      this.af.refFromURL(this.downloadUrl).delete();
    }

    this.router.navigate(['/admin'])
  }

}
