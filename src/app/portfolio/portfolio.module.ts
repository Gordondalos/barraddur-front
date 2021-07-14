import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentsComponent } from './instruments/instruments.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { AgGridModule } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { GroupKreatorComponent } from './group-kreator/group-kreator.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BuySellModule } from '../buy-sell/buy-sell.module';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { InstrumentDetailComponent } from './instrument-detail/instrument-detail.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CountInfoComponent } from './count-info/count-info.component';
import { BuySellOneComponent } from '../buy-sell-one/buy-sell-one.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BuyComponent } from './buy/buy.component';
import { BySearchComponent } from './buy/by-search/by-search.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NewsBarComponent } from './news-bar/news-bar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OrderbookComponent } from './orderbook/orderbook.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HistoryTrilingComponent } from './history-triling/history-triling.component';
import { StoreModule } from '../store/store.module';
import { StatisticComponent } from './statistic/statistic.component';
import { MatCardModule } from '@angular/material/card';
import { TransPipe } from './instruments/trans.pipe';
import { IconPipe } from './buy/by-search/icon.pipe';
import { RadarComponent } from './radar/radar.component';


const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent,
  },
  {
    path: 'detail/:figi',
    component: InstrumentDetailComponent,
  },

  {
    path: 'buy',
    component: BuyComponent,
  },
];

@NgModule({
  declarations: [
    PortfolioComponent,
    InstrumentsComponent,
    GroupKreatorComponent,
    InstrumentDetailComponent,
    CountInfoComponent,
    BuySellOneComponent,
    BuyComponent,
    BySearchComponent,
    NewsBarComponent,
    OrderbookComponent,
    HistoryTrilingComponent,
    StatisticComponent,
    TransPipe,
    IconPipe,
    RadarComponent,

  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatTableModule,
        MatInputModule,
        MatSortModule,
        AgGridModule.withComponents([]),
        MatButtonModule,
        MatAutocompleteModule,
        FormsModule,
        MatIconModule,
        BuySellModule,
        MatListModule,
        MatTabsModule,
        NgApexchartsModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        ScrollingModule,
        MatDatepickerModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        StoreModule,
        MatCardModule,
    ],
  exports: [
    PortfolioComponent,
  ],
})
export class PortfolioModule {
}
