import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { News } from '../../interfaces/news.interface';

@Component({
  selector: 'app-news-info',
  templateUrl: './news-info.component.html',
  styleUrls: ['./news-info.component.scss'],
})
export class NewsInfoComponent implements OnInit {

  news: News;

  constructor(
    private feedService: FeedService,
  ) {
    this.feedService.openNewsEvent.subscribe((news: News) => {
      this.news = news;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (!this.news) {
        this.feedService.getFirstNews.next();
      }
    }, 1000);

  }

}
