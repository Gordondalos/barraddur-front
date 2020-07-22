import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { News } from 'src/app/interfaces/news.interface';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit, OnDestroy {
  nw: News;
  news: News [] = [];
  private unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private feedService: FeedService,
    private router: Router,
    private route: ActivatedRoute
    ) { 
    this.router.events
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((event) => {
        if(event instanceof NavigationEnd){
          const id = route.snapshot.params.id;
          console.log(id);
          if(id){
            this.loadNews(id);
          }
        }
      })
    }

 async ngOnInit() {
    this.news = await this.feedService.getNews();
    this.nw = this.news[0];
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
 async loadNews(id){
    this.nw = await this.feedService.getById(+id);
  }
}
