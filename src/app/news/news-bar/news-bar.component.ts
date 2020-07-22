import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/interfaces/news.interface';
import { FeedService } from 'src/app/services/feed.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-bar',
  templateUrl: './news-bar.component.html',
  styleUrls: ['./news-bar.component.scss']
})
export class NewsBarComponent implements OnInit {

  news: News[] = [];
  constructor(
    private feedService: FeedService,
    public router: Router
    ) { }

  ngOnInit() {
      this.news = this.feedService.News;
  }
  openNewsDetail(id){
    this.router.navigateByUrl(`/news/${id}`);
  }
}
