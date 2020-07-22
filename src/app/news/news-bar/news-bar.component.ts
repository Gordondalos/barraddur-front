import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/interfaces/news.interface';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-news-bar',
  templateUrl: './news-bar.component.html',
  styleUrls: ['./news-bar.component.scss']
})
export class NewsBarComponent implements OnInit {

  news: News[] = [];
  constructor(private feedService: FeedService) { }

  ngOnInit() {
      this.news = this.feedService.News;
  }
  openNewsDetail(){
    
  }
}
