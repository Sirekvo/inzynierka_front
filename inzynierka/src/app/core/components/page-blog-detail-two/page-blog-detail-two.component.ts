import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';
import {PostInput, PostOutput} from "../../../shared/models/post.model";
import {PostService} from "../../../shared/services/post.service";
import {finalize} from "rxjs/operators";
import {ImageService} from "../../../shared/services/image.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

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



  constructor(private postService: PostService,
              private storage:AngularFireStorage,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.resetForm();

  }

  onSubmit(form: any){
    console.log(form.value.creator);
    console.log(form.value.title);
    console.log(form.value.description);
    console.log(form.value.production);
    console.log(form.value.premiere);
    console.log(form.value.genre);
    const new_date = form.value.premiere.year + "-" + form.value.premiere.month + "-" + form.value.premiere.day;
    console.log(new_date);

    this.postService.createPost(form.value.title, form.value.creator, form.value.genre, form.value.production, new_date, form.value.description).subscribe(
        (response: any) => {
          console.log("przeszlo!");
          this.resetForm();
        },
        () => {

        }
    );
    this.isSubmitted = true;
    var filePath = `${this.postList.map(t => t.series_id)[this.postList.length-1]+1}/${this.selectedImage.name}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            this.imageUrl=url;
            this.imageService.insertImageDatails(this.imageUrl);
            this.resetForm();
          })
        })
    ).subscribe();
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

}
