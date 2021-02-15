import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/interfaces/news.interface';
import { FeedService } from 'src/app/services/feed.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';


// export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
//   constructor() {
//     super(40, 2000, 2500);
//   }
// }

@Component({
  selector: 'app-news-bar',
  templateUrl: './news-bar.component.html',
  styleUrls: ['./news-bar.component.scss'],
  // providers: [{provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy}]
  // providers: [{provide: VIRTUAL_SCROLL_STRATEGY}]
})

export class NewsBarComponent implements OnInit {
  from: any = moment().subtract(200, 'day').format('YYYY-MM-DD');
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
