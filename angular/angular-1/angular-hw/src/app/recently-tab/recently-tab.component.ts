import { Component, OnInit } from '@angular/core';
import { WordAdditionService } from '../word-addition.service';

@Component({
  selector: 'app-recently-tab',
  templateUrl: './recently-tab.component.html',
  styleUrls: ['./recently-tab.component.css']
})
export class RecentlyTabComponent implements OnInit {

  text: string;

  constructor(private WordAdditionService: WordAdditionService) {}
  
  ngOnInit(): void {
    let date = new Date();
    this.text = `words - слова`;
  }

  onClick(): void{
    this.WordAdditionService.callService("text for test");
    console.log(window.localStorage);
  }

}
