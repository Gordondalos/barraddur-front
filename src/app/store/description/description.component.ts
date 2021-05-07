import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,

  ) {
    this.id = route.snapshot.queryParams.info;
    console.log(this.id);
  }

  ngOnInit(): void {
  }

  openStore() {
    this.router.navigateByUrl('/portfolio?open=store');
  }
}
