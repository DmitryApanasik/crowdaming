import {Component, EventEmitter, Output} from "@angular/core";
import {CloudinaryImageComponent, CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';

@Component({
  selector: 'app-cloudinary',
  templateUrl: './CloudinaryComponent.html',
  styleUrls:["./CloudinaryComponent.css"]
})
export class CloudinaryComponent{

  cloudinaryImage: any;
  @Output() upImg: EventEmitter<any> = new EventEmitter();
  @Output() upImgStep: EventEmitter<any> = new EventEmitter();
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'crowbanding', uploadPreset: 'f4k1c585' })
  );

  constructor(){

    this.uploader.onAfterAddingFile = (item: any) => {
      this.uploader.uploadAll();
      return item;
    };
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      this.upImg.emit(JSON.parse(response).public_id);
      this.upImgStep.emit(JSON.parse(response).public_id);
      console.log('it public url: ' + JSON.parse(response).public_id);
      return {item, response, status, headers};
    };
  }
}
