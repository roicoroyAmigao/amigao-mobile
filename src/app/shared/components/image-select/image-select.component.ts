/* eslint-disable new-parens */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CameraSource, Camera, CameraResultType, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform, ActionSheetController, LoadingController, ToastController } from '@ionic/angular';
import { ApiImage, ApiService } from './api.service';
// Add one more import
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.scss'],
})
export class ImageSelectComponent implements OnInit {
  @ViewChild('uploadFormEl', { static: false }) uploadFormEl: ElementRef<HTMLFormElement>;
  // images: ApiImage[] = [];
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  images: LocalFile[] = [];
  uploadForm: FormGroup;
  picture: FormControl;
  imageUrl;
  constructor(
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private api: ApiService
  ) { }
  loadImages() {

  }
  async ngOnInit() {
    this.loadFiles();
    this.uploadForm = this.formBuilder.group({
      cover: new FormControl(),
    });
  }

  async loadFiles() {
    this.images = [];

    const loading = await this.loadingCtrl.create({
      message: 'Loading data...',
    });
    await loading.present();

    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: Directory.Data,
    }).then(result => {
      this.loadFileData(result.files);
    },
      async (err) => {
        // Folder does not yet exists!
        await Filesystem.mkdir({
          path: IMAGE_DIR,
          directory: Directory.Data,
        });
      }
    ).then(_ => {
      loading.dismiss();
    });
  }
  async startUpload(file: LocalFile) {
    const response = await fetch(file.data);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('files', blob, file.name);
    this.uploadData(formData);
  }

  // Upload the formData to our API
  async uploadData(formData) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading image...',
    });
    await loading.present();

    // Use your own API!
    const url = 'http://localhost:1337/api/upload';

    this.http.post(url, formData, {})
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe((res: any) => {
        if (res) {
          this.presentToast('File upload complete.');
        } else {
          this.presentToast('File upload failed.');
        }
      });
  }
  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
    });
    this.loadFiles();
    this.presentToast('File removed.');
  }
  // Get the actual base64 data of an image
  // base on the name of the file
  async loadFileData(fileNames: string[]) {
    for (const f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f}`;
      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });
      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
    }
  }

  // Little helper
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt // Camera, Photos or Prompt!
    });
    console.log(image);
    if (image) {
      this.saveImage(image);
    }
  }

  // Create a new file from a capture image
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data
    });

    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    this.loadFiles();
  }

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }

  }
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

