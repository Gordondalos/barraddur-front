import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { News } from '../../interfaces/news.interface';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {

  from: any = moment().subtract(15, 'day').format('YYYY-MM-DD');
  to: any = moment().format('YYYY-MM-DD');
  news: News[] = [];

  constructor(
    private feedService: FeedService,
  ) {
    this.feedService.getFirstNews.subscribe(() => {
      this.feedService.openNewsEvent.next(this.news[0]);
    });
  }

  ngOnInit(): void {
    this.loadNews();
  }

  async loadNews() {
    //  debugger;
    this.news = await this.feedService.getNews(this.from, this.to);
  }

  openNews(nw: News) {
    this.feedService.openNewsEvent.next(nw);
  }
}
