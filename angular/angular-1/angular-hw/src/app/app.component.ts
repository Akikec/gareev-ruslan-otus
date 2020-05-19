import { Component, OnInit } from '@angular/core';
import { WordAdditionService } from './word-addition.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isRecent: Boolean;
  isGo: Boolean;
  isSettings: Boolean;
  title = 'Learn English';
  response = {};

  constructor(private WordAdditionService: WordAdditionService) {}

  ngOnInit() {
    this.isRecent = true;
  };

  onClick(code) {
    this.hideAll();
    switch (code) {
      case "recent":
        this.isRecent = true;
        break;
      case "go":  
        this.isGo = true;
        break;
      case "settings":  
        this.isSettings = true;
        break;  
      default:
        this.isRecent = true;
        break;
    }
  };
  hideAll() {
    this.isRecent = false;
    this.isGo = false;
    this.isSettings = false;
  };
}
