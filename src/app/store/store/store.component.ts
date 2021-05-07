import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  products = [
    {
      title: 'Робот трейлинг стоп',
      id: 'ts',
      description:
        `Робот трейлинг стоп - это программа которая автоматически подтягивает
       стоп-лосс заявку продажу вслед за растущим трендом.`,
      linkDetail: '',
      price: '500 руб/мес'
    },
    {
      title: 'Тариф Gold',
      id: 'gold',
      description:
        `Тариффный план голд это расширенные возможности в торговле
         включающие в себя Аналитическую систему базирующуюся на нейронных сетях и робот помошник - трейлинг стоп`,
      linkDetail: '',
      price: '1500 руб/мес'
    }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  buy(item: { linkDetail: string; price: string; description: string; id: string; title: string }) {
    console.log('buy');
  }

  openDescription(item: { linkDetail: string; price: string; description: string; id: string; title: string }) {
    this.router.navigateByUrl(`/store/description?info=${item.id}`);
  }
}
