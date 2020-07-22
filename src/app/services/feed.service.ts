import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  News: any [] = [
    {
      newsId: 1,
      title: 'Photos',
      data: new Date('1/1/16'),
      imageUrl: '',
      text: 'Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
    },
    {
      newsId: 2,
      title: 'Recipes',
      data: new Date('1/17/16'),
      imageUrl: '',
      text: 'Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
    },
    {
      newsId: 3,
      title: 'Work',
      data: new Date('1/28/16'),
      imageUrl: '',
      text: 'Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
    }
  ];
  constructor() { }
}
