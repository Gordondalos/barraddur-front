import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  News: any [] = [
    {
      id: 1,
      title: 'Photos in culpa qui officia',
      data: new Date('1/1/16'),
      img: 'assets/img/grafik.png',
      text: 'Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
    },
    {
      id: 2,
      title: 'Recipes qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      data: new Date('1/17/16'),
      img: 'assets/img/grafik.png',
      text: 'Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
    },
    {
      id: 3,
      title: 'Work qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      data: new Date('1/28/16'),
      img: 'assets/img/grafik.png',
      text: 'Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
    }
  ];
  constructor() { }
  async getById(id: number): Promise<any> {
    return this.News.find(index => index.id === id)
  }
  async getNews(): Promise<any>{
    return this.News;
  }
}
