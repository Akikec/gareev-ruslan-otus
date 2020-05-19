import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordTranslationService {

  private baseUrl: string;
  private APIkey: string;

  constructor(
    private http: HttpClient
  ) { 
    this.baseUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate";
    this.APIkey = "trnsl.1.1.20200519T165233Z.0e84e0db6130bc86.4214c3cb18a51e5ad13d07922112ea3f533e1e49";
  }

  callService(word: String) {
    let comleteUrl = `${this.baseUrl}?key=${this.APIkey}&text=${word}&lang=en-ru`;
    return this.http.get(comleteUrl).pipe(map(data => { return data["text"] }));
  }
}
