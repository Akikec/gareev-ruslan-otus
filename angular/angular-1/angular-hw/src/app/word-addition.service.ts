import { Injectable } from '@angular/core';
import { WordTranslationService } from './word-translation.service';
import { DictionaryStorageService } from "./dictionary-storage.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordAdditionService {

  response = [];

  constructor(private wordTransService: WordTranslationService, private dictionaryStorageService: DictionaryStorageService) { }

  callService(text: String) {
    let words = this.splitText(text);
    var a = words.map(
      word => {
        return this.wordTransService.callService(word).subscribe(data=>
          {
            this.dictionaryStorageService.callService(data);
          }
        )
      }
    );
  }
  splitText(text: String) {
    return text.split(" ");
  }
}
