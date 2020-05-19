import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DictionaryStorageService {

  private readonly storage: Storage;
  i: number  = 0;

  constructor() { 
    this.storage = window.localStorage;
  }
  callService(word: string) {
    var key = this.i++;
    this.setItem(key.toString(), word);
  }
  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
}
