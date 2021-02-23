import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { AdComponent } from './add-component.interface';
import { AdDirective } from './ad.directive';
import { DinamicLoaderService } from '../services/dinamic-loader.service';

@Component({
  selector: 'app-dinamic-loader',
  templateUrl: './dinamic-loader.component.html',
  styleUrls: ['./dinamic-loader.component.scss'],
})
export class DinamicLoaderComponent implements OnInit {
  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;

  constructor(
    private dinamicLoaderService: DinamicLoaderService,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this.dinamicLoaderService.loadComponent$
      .subscribe((obj) => {
      this.loadComponent(obj);
    });
  }


  ngOnInit(): void {

  }

  loadComponent(obj: { component: any, data: any }) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(obj.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent> componentRef.instance).data = obj.data;
  }

}
