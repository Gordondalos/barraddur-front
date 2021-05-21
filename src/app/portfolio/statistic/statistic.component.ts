import { Component, Input, OnInit } from '@angular/core';
import { MarketInstrument } from '../../interfaces/marketInstrument.interface';
import { PortfolioService } from '../../services/portfolio.service';
import { StatisticInterace } from '../../interfaces/statistic.interace';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {

  @Input() info: MarketInstrument;
  @Input() figi: string;

  statistic: StatisticInterace;

  displayedColumns: string[] = [
    'key',
    'value',
    'consensus',
  ];
  dataSource: MatTableDataSource<any>;

  constructor(
    private portfolioService: PortfolioService,
  ) {
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.statistic = await this.portfolioService.getStatisticInfo(this.info.ticker);
    // console.log(this.statistic);
    let data: any = Object.keys(this.statistic).map(key => ({ key, value: this.statistic[ key ] }))
      .filter((item) => {
        return item.key !== 'id'
          && item.key !== 'ticker'
          && item.key !== 'companies'
          && item.key !== 'created_at'
          && item.key !== 'table_1';
      });

    data = _.each(data, (item) => {
      item.consensus = '-';
      item.description = this.getDescription(item.key);
      item.title = this.getTitle(item.key).replace('percent', '%');
    });
    // console.log(data);
    this.dataSource = new MatTableDataSource(data);
    // console.log(this.dataSource);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDescription(key) {
    switch (key) {
      case 'ATR':
        return 'Average True Range, (ATR) - Чем выше значение индикатора, тем выше вероятность смены тренда; чем ниже его значение, тем слабее направленность тренда';
      case 'Avg_Volume':
        return 'Средний объем';
      case 'Beta':
        return 'Мерой рыночного риска, отражает изменчивость доходности ценной бумаги (портфеля) по отношению к доходности другого портфеля, в роли которого часто выступает среднерыночный портфель';
      case 'Book_sh':
        return ' Балансовая стоимость на акцию ... Балансовая стоимость – это, грубо говоря, капитал компании. Это результат оценки всех ее активов, за вычетом различных обязательств и задолженностей.';
      case 'Cash_sh':
        return 'Cash per share – это денежная стоимость акции. Рассчитывается этот показатель следующим образом: капитализация компании делится на общее число акций. Показатель Cash per share (CPS) позволяет определить ликвидность предприятия, а также оценить общее финансовое «здоровье» компании.';
      case 'Change_percent':
        return 'Изменение за сегодня';
      case 'Current_Ratio':
        return 'Коэффициент текущей ликвидности (Current Ratio) – показывает способность компании выполнять свои краткосрочные обязательства, подлежащие погашению в течение года за счёт оборотных активов. Нормальным значением коэффициента текущей ликвидности предприятия считается 2 – это означает, что компания способна полностью или, как говорят два раза покрыть краткосрочные обязательства за счёт оборотных активов. В случае, когда у предприятия значение коэффициента текущей ликвидности меньше 1 – это говорит о возможных трудностях или несостоятельности полностью погасить свои текущие обязательства в течение 12 месяцев, что в свою очередь, может указывать на более высокий риск закредитованности или дефолта.';
      case 'Debt_Eq':
        return 'Коэффициент Долг/Собственный капитал (Debt to Equity Ratio) представляет собой соотношение заемного и собственного капитала (чистых активов) компании. Характеризует финансовую устойчивость и независимость компании. Оптимальным считается значение коэффициента в пределах 0,5-0,7. При высоких показателях Debt to Equity компания теряет финансовую независимость и ей сложнее привлекать дополнительные займы. Низкая величина коэффициента говорит об упущенной компанией возможности повысить рентабельность собственного капитала (Shareholders’ Equity) за счет привлечения заемных средств – получения эффекта финансового рычага.';
      case 'Dividend':
        return 'Дивиденды выплачиваемые компанией';
      case 'Dividend_percent':
        return 'Дивиденды в процентах';
      case 'EPS_Q_Q_percent':
        return 'Показатель квартальной прибыли на акцию, один из основных фундаментальных показателей компании. Он выражает доходность от бизнеса компании после уплаты налогов, которая припадает на одну акцию, как долю в компании. Чем выше тем лучше';
      case 'EPS_next_5Y_percent':
        return 'Долгосрочный рост прибыли на акцию рассчитанный на 5 лет.';
      case 'EPS_next_Q':
        return '(Earnings per share next quarter) прибыль на акцию рассчитана на следующий квартал';
      case 'EPS_next_Y1':
        return '(Earnings per share next year) прибыль на акцию рассчитана на следующий год.';
      case 'EPS_next_Y2_percent':
        return '(Earnings per share next year) прибыль на акцию рассчитана на следующие 2 года.';
      case 'EPS_past_5Y_percent':
        return '(Earnings per share next year) прибыль на акцию рассчитана на следующие 5 лет.';
      case 'EPS_this_Y_percent':
        return 'Рост прибыли на акцию за этот год.';
      case 'EPS_ttm':
        return 'Прибыль на акцию-это основополагающий финансовый показатель, применяющийся в процессе оценки инвестиционной привлекательности предприятий Чем больше значение EPS – тем надежней и слаженней работает компания.';
      case 'Earnings':
        return 'Earnings';
      case 'Employees':
        return 'Количество сотрудников';
      case 'Forward_P_E':
        return 'Форвардный коэффициент P/E основан на прогнозируемой прибыли на акцию на период следующих 12 месяцев для расчета соотношения цены и доходности. Рассчитывается как деление текущей стоимости ценной бумаги на прогнозируемую прибыль на акцию';
      case 'Gross_Margin':
        return 'Валовая маржа - это разница между доходами и стоимостью до учета некоторых других расходов. Как правило, он рассчитывается как цена продажи предмета, за вычетом стоимости проданных товаров.';
      case 'Income':
        return 'Доход';
      case 'Index':
        return 'Индекс';
      case 'Insider_Own_percent':
        return 'Процент акций у инсайдеров';
      case 'Insider_Trans_percent':
        return 'Возможность осуществления торговли сотрудниками компании (показатель ниже -20% считается очень плохим, норма свыше -60%)';
      case 'Inst_Own_percent':
        return 'Inst_Own_percent';
      case 'Inst_Trans_percent':
        return 'Inst_Trans_percent';
      case 'LT_Debt_Eq':
        return 'долг на акцию';
      case 'Market_Cap':
        return 'Капитализация (Сapitalization) отражает оценку компании на финансовом рынке рыночными инвесторами. Различают общую капитализацию как оценку рынком всех финансовых активов, выпущенных компанией, и рыночную капитализацию (Market Capitalization) как биржевую оценку только обыкновенных акций.';
      case 'Oper_Margin_percent':
        return 'Маржа операционной прибыли — индикатор рентабельности, применяемый для определения процента прибыли, полученной бизнесом от своей деятельности до вычета налогов и процентов.';
      case 'Optionable':
        return 'Возможность заключения опциона';
      case 'PEG':
        return 'PEG коэффициент (англ. PEG ratio, Prospective Earnings Growth Ratio) – финансовый коэффициент сопоставляющий цену акции с прибылью на акцию и ожидаемой будущей прибылью компании.';
      case 'P_B':
        return 'Коэффициент (Price-to-book ratio) – финансовый коэффициент, равный отношению текущей рыночной капитализации компании к её балансовой стоимости. Коэффициент P/B обычно используется для сравнения банков, по причине того, что активы и пассивы банков почти всегда соответствуют их рыночной стоимости. P/B коэффициент не предоставляет никакой информации о способности компании приносить прибыль акционерам, однако этот коэффициент даёт инвестору представление о том, не переплачивает ли он за то, что останется от компании в случае её немедленного банкротства.';
      case 'P_C':
        return 'Р — рыночная стоимость активов компании (рыночная капитализация). С — восстановительная стоимость активов компании, равная сумме расходов, необходимых для приобретения всех активов фирмы по текущим ценам. Если этот коэффициент ниже единицы то компания недооценена, если выше то говорят что рыночная стоимость отображает не измеримые активы например бренд';
      case 'P_E':
        return 'В целом, коэффициент цена / прибыль указывает количество лет, за которые окупятся акции. Например, если коэффициент равен 20, то окупаемость 20 лет. Высокий P/E обычно говорит о том, что рынок готов платить за акции компании более высокую цену в надежде на ее способность существенно увеличить свою прибыль. (P/E также может быть «раздут» искусственно, если компания имеет очень слабые показатели прибыли за предшествующий год, а, следовательно, низкое значение делителя в дроби.) Низкий P/E показывает, что рынок недостаточно уверен в будущем росте прибыли компании';
      case 'P_FCF':
        return 'Коэффициент Р/FCF (Price/Free Cash Flow, FCF, Цена/Свободный денежный поток) – показывает какой объем средств остается в распоряжении компании и может быть направлен на выплату дивидендов. Низкое значение P/FCF, как правило, означает, что акции компании являются недооцененными. Если P/FCF отрицательный, соответственно у компании отрицательный свободный денежный поток, значит компании придётся занимать денежные средства, что в свою очередь отразится на долговой нагрузке.';
      case 'P_S':
        return 'Коэффициент Цена/Выручка (Price/Revenues или Price/Sales, Р/S) — оценивает компанию по объему выручки и показывает сколько инвестор платит за 1 рубль (Доллар) дохода. чем ниже данный показатель, тем лучше, и тем меньше инвестор платит за каждый рубль (доллар), получаемый компанией с продаж. При P/S < 1 есть возможность купить этот рубль (доллар) с дисконтом.';
      case 'Payout_percent':
        return 'Payout Ratio – коэффициент выплаты дивидендов. Процентная доля прибыли, выплаченная в качестве дивиденда.';
      case 'Perf_Half_Y_percent':
        return '170.10';
      case 'Perf_Month_percent':
        return '-17.51';
      case 'Perf_Quarter_percent':
        return '5.06';
      case 'Perf_Week_percent':
        return '-12.95';
      case 'Perf_YTD_percent':
        return '23.23';
      case 'Perf_Year_percent':
        return '575.24';
      case 'Prev_Close':
        return '44.98';
      case 'Price':
        return 'Цена на акцию';
      case 'Profit_Margin_percent':
        return '-6.10';
      case 'Quick_Ratio':
        return '1.80';
      case 'ROA_percent':
        return 'ROA (Return on Assets) – коэффициент рентабельности активов, показывающий процентное соотношение чистой прибыли предприятия к его общим активам (данные по балансу). Коэффициент ROA простыми словами – это финансовый показатель эффективности ведения бизнеса, который, фактически, говорит о результативности использования компанией своего имущества, включая кредитные заимствования.';
      case 'ROE_percent':
        return 'Рентабельность собственного капитала (англ. return on equity, ROE) — относительный показатель эффективности деятельности, частное от деления чистой прибыли, полученной за период, на собственный капитал организации. Один из финансовых коэффициентов, входит в группу коэффициентов рентабельности. Показывает отдачу на инвестиции акционеров с точки зрения учетной прибыли, чем выше тем лучше';
        case 'ROI_percent':
        return 'ROI (от англ. return on investment) или ROR (англ. rate of return) — финансовый коэффициент, иллюстрирующий уровень доходности или убыточности бизнеса, учитывая сумму сделанных в этот бизнес инвестиций. Чем выше тем лучше';
      case 'RSI_14':
        return 'Индекс относительной силы (Relative Strength Index) технический осциллятор, показывающий силу цены путем сравнения позитивных и негативных изменений цены от закрытия до закрытия. Показывает уровни перепроданности (сигнал покупать ниже 30) и перекупленности (сигнал продавать выше 70) для акции.';
      case 'Recom':
        return '1.70';
      case 'Rel_Volume':
        return '0.73';
      case 'SMA20_percent':
        return '-11.23';
      case 'SMA50_percent':
        return '-10.59';
      case 'SMA200_percent':
        return '52.93';
      case 'Sales':
        return '373.60M';
      case 'Sales_Q_Q_percent':
        return '35.10';
      case 'Sales_past_5Y_percent':
        return '-';
      case 'Short_Float_percent':
        return '5.97';
      case 'Short_Ratio':
        return '3.00';
      case 'Shortable':
        return 'Yes';
      case 'Shs_Float':
        return '110.49M';
      case 'Shs_Outstand':
        return '123.43M';
      case 'Target_Price_percent':
        return '68.17';
      case 'Volatility':
        return '6.05% 8.16%';
      case 'Volume':
        return '1,607,962';
      case 'W_High_52_percent':
        return '-33.41';
      case 'W_Low_52_percent':
        return '701.13';
      case 'W_Range_52':
        return '5.31 - 63.88';
      case 'companies':
        return 'companies';
      default: return key;
    }
  }

  getTitle(key) {
    switch (key) {
      case 'ATR':
        return 'ATR';
      case 'Avg_Volume':
        return 'Avg_Volume';
      case 'Beta':
        return 'Beta';
      case 'Book_sh':
        return 'Book/sh';
      case 'Cash_sh':
        return 'Cash/sh';
      case 'Change_percent':
        return 'Change percent';
      case 'Current_Ratio':
        return 'Current Ratio';
      case 'Debt_Eq':
        return 'Debt/Eq';
      case 'Dividend':
        return 'Dividend';
      case 'Dividend_percent':
        return 'Dividend percent';
      case 'EPS_Q_Q_percent':
        return 'EPS Q/Q percent';
      case 'EPS_next_5Y_percent':
        return 'EPS next 5Y percent';
      case 'EPS_next_Q':
        return 'EPS next Q';
      case 'EPS_next_Y1':
        return 'EPS next Y1';
      case 'EPS_next_Y2_percent':
        return 'EPS next Y2 percent';
      case 'EPS_past_5Y_percent':
        return 'EPS past 5Y percent';
      case 'EPS_this_Y_percent':
        return 'EPS this Y percent';
      case 'EPS_ttm':
        return 'EPS ttm';
      case 'Earnings':
        return 'Earnings';
      case 'Employees':
        return 'Employees';
      case 'Forward_P_E':
        return 'Forward P/E';
      case 'Gross_Margin':
        return 'Gross Margin';
      case 'Income':
        return 'Income';
      case 'Index':
        return 'Index';
      case 'Insider_Own_percent':
        return 'Insider Own percent';
      case 'Insider_Trans_percent':
        return 'Insider Trans percent';
      case 'Inst_Own_percent':
        return 'Inst Own percent';
      case 'Inst_Trans_percent':
        return 'Inst Trans percent';
      case 'LT_Debt_Eq':
        return 'LT Debt/Eq';
      case 'Market_Cap':
        return 'Market Cap';
      case 'Oper_Margin_percent':
        return 'Oper Margin percent';
      case 'Optionable':
        return 'Optionable';
      case 'PEG':
        return 'PEG';
      case 'P_B':
        return 'P/B';
      case 'P_C':
        return 'P/C';
      case 'P_E':
        return 'P/E';
      case 'P_FCF':
        return 'P/FCF';
      case 'P_S':
        return 'P/S';
      case 'Payout_percent':
        return 'Payout percent';
      case 'Perf_Half_Y_percent':
        return 'Perf Half Y percent';
      case 'Perf_Month_percent':
        return 'Perf Month percent';
      case 'Perf_Quarter_percent':
        return 'Perf Quarter percent';
      case 'Perf_Week_percent':
        return 'Perf Week percent';
      case 'Perf_YTD_percent':
        return 'Perf YTD percent';
      case 'Perf_Year_percent':
        return 'Perf Year percent';
      case 'Prev_Close':
        return 'Prev Close';
      case 'Price':
        return 'Price';
      case 'Profit_Margin_percent':
        return 'Profit Margin percent';
      case 'Quick_Ratio':
        return 'Quick Ratio';
      case 'ROA_percent':
        return 'ROA percent';
      case 'ROE_percent':
        return 'ROE percent';
      case 'ROI_percent':
        return 'ROI percent';
      case 'RSI_14':
        return 'RSI 14';
      case 'Recom':
        return 'Recom';
      case 'Rel_Volume':
        return 'Rel Volume';
      case 'SMA20_percent':
        return 'SMA20 percent';
      case 'SMA50_percent':
        return 'SMA50 percent';
      case 'SMA200_percent':
        return 'SMA200 percent';
      case 'Sales':
        return 'Sales';
      case 'Sales_Q_Q_percent':
        return 'Sales Q Q percent';
      case 'Sales_past_5Y_percent':
        return 'Sales past 5Y percent';
      case 'Short_Float_percent':
        return 'Short Float percent';
      case 'Short_Ratio':
        return 'Short Ratio';
      case 'Shortable':
        return 'Shortable';
      case 'Shs_Float':
        return 'Shs Float';
      case 'Shs_Outstand':
        return 'Shs Outstand';
      case 'Target_Price_percent':
        return 'Target Price percent';
      case 'Volatility':
        return 'Volatility';
      case 'Volume':
        return 'Volume';
      case 'W_High_52_percent':
        return 'W High 52 percent';
      case 'W_Low_52_percent':
        return 'W Low 52 percent';
      case 'W_Range_52':
        return 'W Range 52';
      case 'companies':
        return 'companies';
      default: return key;
    }
  }

}
