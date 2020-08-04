import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/interfaces/news.interface';
import { FeedService } from 'src/app/services/feed.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-news-bar',
  templateUrl: './news-bar.component.html',
  styleUrls: ['./news-bar.component.scss'],
})

export class NewsBarComponent implements OnInit {
  from: any = moment().subtract(15, 'day').format('YYYY-MM-DD');
  to: any = moment().format('YYYY-MM-DD');
  news: News[] = [];

  constructor(
    private feedService: FeedService,
    public router: Router,
  ) {
  }

  async ngOnInit() {
    this.loadNews();
  }

  openNewsDetail(id) {
    this.router.navigateByUrl(`/news/${ id }`);
  }

  async loadNews() {
    //  debugger;
    this.news = await this.feedService.getNews(this.from, this.to);
  }

}
