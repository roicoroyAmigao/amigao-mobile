/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface ApiImage {
    _id: string;
    name: string;
    createdAt: Date;
    url: string;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    headers_json = new HttpHeaders().set('Content-Type', 'application/json');
    headers_form_data = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjUxMDc5MDkzLCJleHAiOjE2NTM2NzEwOTN9._hHuMaR9TgoPnsT55qCgrB2uOsC_K7umtld3JIqDNwE'
    apiToken = '37bff09f2b1c7faae1bc915eea5725e463ba267980b30e55abcf53b8c740ecf047e39add5189a14cedc51ba5a19b67723819364f0c575dcee8a47effa2293e5e094e9c2590d24cacf110452805b628391f7eee9b77f44307bcbebec0294bc8d20ece852e671da9a9ea09ea61ab937d70f55118851b6954ed5f7616c29e4e22a9'
    httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${this.apiToken}`
            })
    };
    url = 'http://localhost:1337';
    // url = 'https://12345.ngrok.io';

    constructor(private http: HttpClient) {

    }

    uploadImage(blobData, name, ext) {
        const formData = new FormData();
        formData.append('file', blobData, `myimage.${ext}`);
        formData.append('name', name);
        return this.http.post(`${this.url}/api/upload`, formData, this.httpOptions);
    }

    uploadImageFile(file: File) {
        console.log(file);
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('name', file.name);
        return this.http.post(`${this.url}/api/upload`, file, this.httpOptions);
    }

    getImages() {
        return this.http.get<ApiImage[]>(`${this.url}/api/upload`, this.httpOptions);
    }

    deleteImage(id) {
        return this.http.delete(`${this.url}/api/upload/${id}`, this.httpOptions);
    }

}
