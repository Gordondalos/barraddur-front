import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { News } from 'src/app/interfaces/news.interface';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  news: News [] = [];
  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.news = this.feedService.News;
  }

}
