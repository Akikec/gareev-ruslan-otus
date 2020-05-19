import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-go-tab',
  templateUrl: './go-tab.component.html',
  styleUrls: ['./go-tab.component.css']
})
export class GoTabComponent implements OnInit {
  word: string;
  ngOnInit(): void {
    this.word = "Education";
  }

  next(): void {
    //
  }

}
