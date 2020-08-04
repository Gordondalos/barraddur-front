import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { News } from '../../interfaces/news.interface';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {



  constructor(
    private feedService: FeedService,
  ) { }

  ngOnInit(): void {

  }



}
