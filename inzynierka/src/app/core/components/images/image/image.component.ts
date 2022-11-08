import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";
import {ImageService} from "../../../../shared/services/image.service";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  imgSrc : string;
  selectedImage : any = null;
  isSubmitted : boolean;

  formTemplate = new FormGroup({
    caption: new FormControl(''),
    category: new FormControl(''),
    imageUrl : new FormControl('')
  })

  constructor(private storage:AngularFireStorage,
              private service : ImageService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  showPreview(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = '';
      this.selectedImage = null;
    }
  }
  onSubmit(formValue){
    this.isSubmitted = true;
    // var filePath = `${formValue.category}/${this.selectedImage.name}_${new Date().getTime()}`;
    // const fileRef = this.storage.ref(filePath);
    // this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
    //     finalize(()=>{
    //       fileRef.getDownloadURL().subscribe((url)=>{
    //         formValue['imageUrl']=url;
    //         this.service.insertImageDatails(formValue);
    //         this.resetForm();
    //       })
    //     })
    // ).subscribe();
  }
  resetForm(){
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption:'',
      imageUrl:'',
      category:'Animal'
    })
    this.imgSrc = '';
    this.isSubmitted = false;
    this.selectedImage = null;
  }
}
