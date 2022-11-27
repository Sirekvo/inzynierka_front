import { Component, OnInit } from '@angular/core';
import {NgbDate, NgbDateStruct, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PostInput, PostInputById} from "../../../shared/models/post.model";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {PostService} from "../../../shared/services/post.service";
import {ImageService} from "../../../shared/services/image.service";
import {ActivatedRoute, Router} from "@angular/router";
import {getParams} from "swiper/angular/angular/src/utils/get-params";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {getLocaleTimeFormat} from "@angular/common";

@Component({
  selector: 'app-post-edition',
  templateUrl: './post-edition.component.html',
  styleUrls: ['./post-edition.component.css']
})
export class PostEditionComponent implements OnInit {

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
  contactForm: FormGroup;

  genres: Array<string> = ['Komedia', 'Dramat', 'Romantyczny', 'Science fiction', 'Kryminalny', 'Fantasy', 'Wojenny', 'Horror'];
  genresSelected = this.genres[0];



  postList: Array<PostInputById>;
  imageUrl: string;
  downloadUrl: string;
  newDownloadUrl = '';
  task: AngularFireUploadTask;
  id: number;
  title: string;
  creator: string;
  production: string;
  description: string;
  premiere: string;
  day: number;
  month: any;
  year: number;


  constructor(private postService: PostService,
              private af:AngularFireStorage,
              private imageService: ImageService,
              private _modalService: NgbModal,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.id = parseFloat(this.route.snapshot.paramMap.get('id'));
    this.resetForm();
    this.postService.getPostById(this.id).subscribe(
        (post: PostInputById) => {
          this.title = post.title;
          this.creator = post.creator;
          this.description = post.description;
          this.production = post.production;
          this.downloadUrl = post.url;
          this.genresSelected = post.genre;
          this.premiere = post.premiere;
          this.year = parseInt(post.premiere.substring(0,4));
          this.month = parseInt(post.premiere.substring(5,7));
          this.day = parseInt(post.premiere.substring(8,12));
          this.model = new NgbDate(this.year,this.month,this.day);


        },
        () => {
        }

    );
  }

  async uploadImages() {
    const filePath = `Images/${this.imgSrc['name']}`;
    const fileRef = this.af.ref(filePath);
    this.task = this.af.upload(filePath, this.imgSrc);
    (await this.task).ref.getDownloadURL().then(url => {
      this.newDownloadUrl = url
      this.downloadUrl = this.newDownloadUrl;
    });
  }
  handleFiles($event){
    this.imgSrc = $event.target.files[0];
  }
  // async onSubmit(form: any) {
  onSubmit(form: any){
    const new_date = form.value.premiere.year + "-" + form.value.premiere.month + "-" + form.value.premiere.day;
    while(this.check == true){
      if(this.downloadUrl != '')
      {
        this.check=false;
        this.postService.editPost(this.id, form.value.title, form.value.creator, form.value.genre, form.value.production, new_date, form.value.description, this.downloadUrl).subscribe(
            (response: any) => {
              this.router.navigate(['/admin']);
              this.resetForm();
              form.reset();
            },
            () => {
              this.check=false;
              this.af.refFromURL(this.downloadUrl).delete();
            }
        );

      }
    }
    this.isSubmitted = true;

  }
  cancelChange(){
    console.log(this.newDownloadUrl);
    if(this.newDownloadUrl == ''){
      this.router.navigate(['/admin']);
    }
    else{
      this.af.refFromURL(this.newDownloadUrl).delete();
      this.router.navigate(['/admin']);

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
      this.imgSrc = "assets/images/blog/add_photo.jpg";
      this.selectedImage = null;
    }
  }
  resetForm(){
    this.imgSrc = "assets/images/blog/add_photo.jpg";
    this.isSubmitted = false;
    this.selectedImage = null;
    this.downloadUrl = '';

  }
}
