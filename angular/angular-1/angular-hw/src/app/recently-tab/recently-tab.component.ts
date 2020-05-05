import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recently-tab',
  templateUrl: './recently-tab.component.html',
  styleUrls: ['./recently-tab.component.css']
})
export class RecentlyTabComponent implements OnInit {

  text: string;
  
  ngOnInit(): void {
    let date = new Date();
    this.text = `words - слова`;
  }

}
