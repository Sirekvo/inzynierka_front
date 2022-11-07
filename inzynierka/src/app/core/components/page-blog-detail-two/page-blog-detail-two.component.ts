import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';

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

  genres: Array<string> = ['Komedia', 'Dramat', 'Romantyczny', 'Science fiction', 'Kryminalny', 'Fantasy', 'Wojenny', 'Horror'];
  genresSelected = this.genres[0];

  formTemplate = new FormGroup({
    // id: new FormControl(''),
    // imageUrl : new FormControl(''),
    title : new FormControl(''),
    creator : new FormControl(''),
    genre : new FormControl(''),
    production : new FormControl(''),
    date : new FormControl(''),
    description : new FormControl('')
  })



  constructor() { }

  ngOnInit(): void {
    this.resetForm();
  }

  onSubmit(form: any){
    console.log(form.value.creator);
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
  }

}
