import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.scss']
})
export class InfoBlockComponent implements OnInit {

  text = `Добро пожаловать на Бараддур,
          здесь вы найдете самую лучшую подборку в Рунете новостей на экономическую тематику.
<!--          <br>-->
<!--          Наша платформа позволяет фильтровать новости по тиккерам акций, формировать группы новостей,-->
<!--          вести собственный портфель и торговать на фондовом рынке.-->
          <br>
          Для получения полного функционала пройдите простую регистрацию.
   `;

  constructor() { }

  ngOnInit(): void {
  }

  close(elem: HTMLDivElement) {
    elem.classList.add('class', 'd-none');
  }
}
