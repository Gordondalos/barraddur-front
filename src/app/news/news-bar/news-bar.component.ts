import { Component, OnInit } from '@angular/core';
export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-news-bar',
  templateUrl: './news-bar.component.html',
  styleUrls: ['./news-bar.component.scss']
})
export class NewsBarComponent implements OnInit {

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
