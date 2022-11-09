import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PostInput, PostInputById} from "../../../shared/models/post.model";
import {Upload} from "../../../shared/models/image.model";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {PostService} from "../../../shared/services/post.service";
import {ImageService} from "../../../shared/services/image.service";
import {ActivatedRoute} from "@angular/router";
import {getParams} from "swiper/angular/angular/src/utils/get-params";

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

  genres: Array<string> = ['Komedia', 'Dramat', 'Romantyczny', 'Science fiction', 'Kryminalny', 'Fantasy', 'Wojenny', 'Horror'];
  genresSelected = this.genres[0];

  // formTemplate = new FormGroup({
  //   id: new FormControl(''),
  //   imageUrl : new FormControl(''),
  // })

  postList: Array<PostInputById>;
  imageUrl: string;
  downloadUrl: string;
  upload: Upload;
  task: AngularFireUploadTask;
  id: number;
  title: string;
  creator: string;
  production: string;
  description: string;


  constructor(private postService: PostService,
              private af:AngularFireStorage,
              private imageService: ImageService,
              private _modalService: NgbModal,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseFloat(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    console.log(typeof this.id);
    this.resetForm();
    this.postService.getPostById(this.id).subscribe(
        (post: PostInputById) => {
          this.title = post.title;
          this.creator = post.creator;
          this.genresSelected = post.genre;
          this.description = post.description;
          this.production = post.production;
          this.downloadUrl = post.url;
        },
        () => {
        }

    );
    console.log(this.postList);
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
  }
  // async onSubmit(form: any) {
  onSubmit(form: any){

    console.log(form.value.title);
    // const new_date = form.value.premiere.year + "-" + form.value.premiere.month + "-" + form.value.premiere.day;
    // while(this.check == true){
    //   if(this.downloadUrl != '')
    //   {
    //     this.check=false;
    //
    //     console.log('usunieto');
    //     this.postService.createPost(form.value.title, form.value.creator, form.value.genre, form.value.production, new_date, form.value.description, this.downloadUrl).subscribe(
    //         (response: any) => {
    //           console.log(response)
    //
    //           console.log("przeszlo!");
    //           this.resetForm();
    //           form.reset();
    //         },
    //         () => {
    //           this.check=false;
    //           this.af.refFromURL(this.downloadUrl).delete();
    //         }
    //     );
    //
    //   }
    // }
    this.isSubmitted = true;

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



    // this.lastPostId = this.postList.map(t => t.series_id);

  }
}
