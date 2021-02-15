import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { News } from 'src/app/interfaces/news.interface';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit, OnDestroy {
  nw: News;
  news: News [] = [];
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private feedService: FeedService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
  ) {
    this.router.events
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const id = route.snapshot.params.id;
          if (id) {
            this.loadNews(id);
          }
        }
      });
  }

  async ngOnInit() {

  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  async loadNews(id) {
    this.nw = await this.feedService.getById(+id);
    console.log(this.nw);
  }

  goBack() {
    this.router.navigateByUrl('/portfolio?open=news');
  }
}
