// eslint-disable-next-line @typescript-eslint/no-shadow
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../shared/services/auth.service';
import { IonStorageService } from '../../shared/services/ionstorage.service';
import { UserStateModel, UserState } from '../../shared/store/user/user.state';
import { StrapiService } from '../../strapi.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  viewState$: Observable<UserStateModel>;
  @Select(UserState.getUserState) userState: Observable<any>;

  addressForm: FormGroup = new FormBuilder().group({
    first_name: new FormControl(),
    last_name: new FormControl(),
    address_1: new FormControl(),
    address_2: new FormControl(),
    city: new FormControl(),
    country_code: new FormControl(),
    phone: new FormControl(),
    postal_code: new FormControl(),
  });
  passwordForm: FormGroup = new FormBuilder().group({
    password: new FormControl(),
    oldPassword: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
  });
  passwordObj: any = {
    password: null,
    oldPassword: null,
    username: 'XXXX',
    email: 'test@test.com',
  };
  addressObj = {
    address_1: 'flat xx qq',
    address_2: 'NewhavePlace',
    city: 'Edinburgh',
    country_code: 'GB',
    first_name: 'Ricardo',
    last_name: 'Bentio',
    phone: '123123123',
    postal_code: 'EH65UH',
  };

  submitted = false;
  passwordSubmitted = false;
  errors: string[] = [];
  user;
  userAvatar;
  avatarField: FormControl;
  uploadForm: FormGroup;
  cover: FormControl;
  avatar;
  imageUrl;
  constructor(
    protected authService: AuthService,
    protected router: Router,
    protected translate: TranslateService,
    protected dataService: StrapiService,
    private ionStorage: IonStorageService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) { }
  async onImagePicked(file) {
    const response = await fetch(file);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('files', blob, file.name);
    this.uploadData(formData);
  }
  async uploadData(formData) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading image...',
    });
    await loading.present();
    const url = 'http://localhost:1337/api/upload';

    this.http.post(url, formData, {})
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe((response: any) => {
        if (response) {
          const fileId = response[0].id;
          console.log(response);
          this.http.put(environment.BASE_PATH + '/api/users/' + this.user.id, {
            data: {
              attachments: fileId,
            },
            avatar: fileId,
          }).subscribe((res) => {
            console.log(res);
            if (res) {
              this.presentToast('File upload complete.');
            }
          });
          console.log(response);
        } else {
          this.presentToast('File upload failed.');
        }
      });
  }
  // Little helper
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }
  ionViewDidEnter() {
    this.http.get(environment.BASE_PATH + '/api/users/me/').subscribe((res: any) => {
      this.user = res;
      this.addressObj = {
        address_1: res?.address_1 ?? null,
        address_2: res?.address_2 ?? null,
        city: res?.city ?? null,
        country_code: res?.country_code ?? null,
        first_name: res?.first_name ?? null,
        last_name: res?.last_name ?? null,
        phone: res?.phone ?? null,
        postal_code: res?.postal_code ?? null,
      };
      this.passwordObj = {
        username: res?.username ?? null,
        email: res?.email ?? null,
        password: this.passwordObj.password ?? null,
        oldPassword: this.passwordObj.oldPassword ?? null,
      };
      console.log(this.addressObj);
    });
  }
  ngOnInit() {
  }
  submitPassworddForm() {
    const data = {
      password: this.passwordObj.password,
      oldPassword: this.passwordObj.oldPassword,
      username: this.passwordObj.username,
    };
    console.log(data);
    this.http.put(environment.BASE_PATH + '/api/users/' + this.user.id, data).subscribe((res) => {
      console.log(res);
    });
  }
  submitForm(): void {
    const data = {
      address_1: this.addressObj.address_1,
      address_2: this.addressObj.address_2,
      city: this.addressObj.city,
      country_code: this.addressObj.country_code,
      first_name: this.addressObj.first_name,
      last_name: this.addressObj.last_name,
      phone: this.addressObj.phone,
      postal_code: this.addressObj.postal_code,
    };
    this.clearErrors();
    this.submitted = true;
    console.log(data);
    this.http.put(environment.BASE_PATH + '/api/users/' + this.user.id, data).subscribe((res) => {
      console.log(res);
    });
    // console.log(data);
  }
  private clearErrors(): void {
    this.errors = [];
  }
  home() {
    this.router.navigateByUrl('welcome');
  }
}
