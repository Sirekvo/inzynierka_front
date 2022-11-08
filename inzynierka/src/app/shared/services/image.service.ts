import { Injectable } from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {AngularFireModule} from "@angular/fire/compat";
import {Upload} from "../models/image.model";
// import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    // private basePath = '/uploads';
    // private uploads: AngularFireList<GalleryImage[]>;
    // constructor(private db: AngularFireDatabase,
    //             private ngFire: AngularFireModule) {
    // }
    // // getImageDetailList(){
    // //     this.imageDetailList = this.firebase.list('imageDetails');
    // // }
    // // insertImageDatails(imageDetails){
    // //     this.imageDetailList.push(imageDetails);
    // // }
    // uploadFile(upload: Upload) {
    //     const storageRef = firebase.storage().ref();
    //     const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`)
    //         .put(upload.file);
    //     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED),
    //         (snapshot) => {
    //         upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
    //         },
    //         (error) => {
    //         console.log(error);
    //         },
    //         (): any => {
    //         upload.url = uploadTask.snapshot.downloadURL;
    //         upload.name = upload.file.name;
    //         this.saveFileData(upload);
    //         };
    // }
    // private saveFileData(upload: Upload){
    //     this.db.list(`${this.basePath}/`).push(upload);
    // }
}