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
      item.info = this.getDescription(item.key);
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
        return {
          description: 'Average True Range, (ATR) - Чем выше значение индикатора, тем выше вероятность смены тренда; чем ниже его значение, тем слабее направленность тренда, это индикатор волатильности',
          interpretation: 'Чем выше значение, тем более волатильна будет бумага в ближайшие 2 недели.',
        };
        break;
      case 'Avg_Volume':
        return {
          description: 'Средний объем за определенный период',
          interpretation: 'Наиболее сравнимый на дистанции показатель между акцииями для понимания ликвидности',
        };
      case 'Beta':
        return {
          description: 'Показатель, рассчитываемый для ценной бумаги или портфеля ценных бумаг. Является мерой рыночного риска, отражая изменчивость доходности ценной бумаги (портфеля) по отношению к доходности другого портфеля, в роли которого часто выступает среднерыночный портфель.',
          interpretation: 'Beta рассчитывается относительно индекса в который она входит, чем выше бета тем больше риск, отрицательная бета означаят разную направленность с индексом , индекс растёт , а акция падает. Если бета равна 1 , то акция будет двигаться вместе с индексом',
        };

      case 'Book_sh':
        return {
          description: ` Балансовая стоимость на акцию ... Балансовая стоимость – это,
           грубо говоря, капитал компании. Это результат оценки всех ее активов, за вычетом различных обязательств и задолженностей.`,
          interpretation: `Чем больше значение по сравнению с другими отраслевыми компаниями тем лучше`,
        };
      case 'Cash_sh':
        return {
          description: `Cash per share – это денежная стоимость акции.
           Рассчитывается этот показатель следующим образом: капитализация компании делится на общее число акций.
           Показатель Cash per share (CPS) позволяет определить ликвидность предприятия, а также оценить общее финансовое «здоровье» компании.`,
          interpretation: `большое значение Cash per Share в целом считается положительным моментом, с одной стороны.
          С другой – говорит о том, что самые ликвидные средства руководство предприятия (возможно) использует не эффективно`,
        };

      case 'Change_percent':
        return {
          description: `Разница между ценой закрытия предыдущего дня и последней ценой сегоднешнего.`,
          interpretation: `Показывает на какой % изменилась цена акции с открытия торгов, применимо к ATR ,
           если цена изменилась больше чем 1 ATR то можно ждать обратное движение и коррекцию`,
        };

      case 'Current_Ratio':
        return {
          description: `Коэффициент текущей ликвидности. Он показывает возможность компании платить по краткосрочным обязательствам
           (долги, которые нужно погасить в течение года) за счёт оборотных активов: наличных денег, дебиторской задолженности, запасов`,
          interpretation: `«Хороший» показатель — 2 и больше. Если мультипликатор меньше 1, это не значит, что компанию в ближайшее время ждёт банкротство. Она может привлечь внешнее финансирование и покрыть долги.`,
        };
      case 'Debt_Eq':
        return {
          description: `Коээфициент показывает, сколько заёмных средств приходится на каждый рубль
           собственного капитала. Рассчитывается как отношение заемного капитала к собственному капиталу`,
          interpretation: `показатель равен 1-1,5 считается нормой, Больше 1,5 — предприятие может потерять свою
           финансовую независимость. Но слишком низкий уровень заёмных средств говорит об упущенных возможностях:`,
        };
      case 'Dividend':
        return {
          description: `Сумма выплаты дивидендов, измеряется в валюте торгуемой акции за 1 год`,
          interpretation: `Чем выше стоимость дивидендов у компаний в одной отрасли, тем более надежной считается компания.`,
        };
      case 'Dividend_percent':
        return {
          description: `Дивидедная доходность - это отношение величины годового дивиденда на акцию к цене акции. Данная величина выражается чаще всего в процентах.`,
          interpretation: `Чем выше дивидендная доходность у компании в сравнимой отрасли, тем лучше, не считая спец дивиденды`,
        };
      case 'EPS_Q_Q_percent':
        return {
          description: `Показатель квартальной прибыли на акцию, один из основных фундаментальных показателей компании.
          Он выражает доходность от бизнеса компании после уплаты налогов, которая припадает на одну акцию, как долю в компании.`,
          interpretation: `Сравниваем внутри отрасли, чем выше показатель тем лучше.`,
        };
      case 'EPS_next_5Y_percent':
        return {
          description: `Рассчитываемый показатель за следующие 5 лет, показывает прибыль на акцию к через 5 лет`,
          interpretation: `Исключительно в сравнительных целях между двумя и более компаниями из одной отрасли, а не как фиксированное значение`,
        };

      case 'EPS_next_Q':
        return {
          description: `Рассчитываемый показатель на следующий квартал, показывает прибыль на акцию на следующий квартал`,
          interpretation: `исключительно в сравнительных целях между двумя и более компаниями из одной отрасли, а не как фиксированное значение`,
        };

      case 'EPS_next_Y1':
        return {
          description: `Рассчитываемый показатель на следующий год, показывает прибыль на акцию через год`,
          interpretation: `Рассчитываемый показатель на следующий год, показывает прибыль на акцию через год`,
        };
      case 'EPS_next_Y2_percent':
        return {
          description: `Рассчитываемый показатель на следующий год, показывает прибыль на акцию через год`,
          interpretation: `Рассчитываемый показатель на следующие 2 года, показывает прибыль на акцию через год`,
        };

      case 'EPS_past_5Y_percent':
        return {
          description: `Рассчитываемый показатель за прошедшие 5 лет, показывает прибыль на акцию за последние 5 лет`,
          interpretation: `Исключительно в сравнительных целях между двумя и более компаниями из одной отрасли, а не как фиксированное значение`,
        };

      case 'EPS_this_Y_percent':
        return {
          description: `Рассчитываемый показатель на текущий год, показывает прибыль на акцию к концу текущего года`,
          interpretation: `Исключительно в сравнительных целях между двумя и более компаниями из одной отрасли, а не как фиксированное значение`,
        };

      case 'EPS_ttm':
        return {
          description: `Коэффициент показывает прибыль на акцию, рассчитывается как отношение чистой прибыли к количеству акций`,
          interpretation: `Исключительно в сравнительных целях между двумя и более компаниями из одной отрасли, а не как фиксированное значение`,
        };
      case 'Earnings':
        return {
          description: `Дата в которую компания отчитывается`,
          interpretation: `Компания может отчитываться, до торгов , после торгов, во время торгов, что влияет на цену акций в день выхода отчетности.`,
        };
      case 'Employees':
        return {
          description: `Колличество сотрудников в компании, работающих на полной ставке.`,
          interpretation: `Чем выше значение, тем более надёжна компания, как правило, но в то же время, тем больше расходы на затраты`,
        };
      case 'Forward_P_E':
        return {
          description: `Форвардный коэффициент P/E основан на прогнозируемой прибыли на акцию на период следующих 12 месяцев для расчета
           соотношения цены и доходности. Рассчитывается как деление текущей стоимости ценной бумаги на прогнозируемую прибыль на акцию`,
          interpretation: `Форвардный мультипликатор P/E скорее следует рассматривать как оптимизм рынка относительно
          перспективности роста компании. Коэффициент P/E и прогнозный показатель P/E особенно полезны при
          сравнении аналогичных компаний в одной отрасли.
          Более высокий форвардный Р/E, чем по отрасли, свидетельствует,
           что компания, возможно, в перспективе значительно вырастет.`,
        };
      case 'Gross_Margin':
        return {
          description: `Валовая прибыль - это разница между выручкой и стоимостью проданных товаров,
           деленная на выручку, показывает какую часть от продаж или цены, составляет прибыль.`,
          interpretation: `Значение больше 0% является нормой, чем выше тем лучше, сравнивается внутри одной отрасли`,
        };
      case 'Income':
        return {
          description: `Прибыль компании`,
          interpretation: `Чем больше значение по сравнению с другими отраслевыми компаниями тем лучше`,
        };
      case 'Index':
        return {
          description: `Определяющее значение сектора экономики`,
          interpretation: `Если компания относится к какому либо индексу это означает 2 вещи: во-первых,
            в неё вкладываются больше фондов;  во-вторых, она в принципе находится на виду у большего числа трейдеров
            и инвесторов.Индексные акции больше ходят за рынком  , то есть по сути за  фьючерсом на тот же S&P 500.
            Это  с одной стороны означает что вас может высадить на очередном капризе рынка, с другой стороны,
            если вы видите что акция из индекса отчётливо не идёт за фьючерсом в течении нескольких дней то к ней
            стоит присмотреться.Кроме того следует помнить, что как правило в таких акциях много крупных игроков
            , и как следствие они более волатильны, хуже держат уровни, чаще делают откаты и высадки.
            Если видите на таких акциях что-то совсем очевидное: уровень на дэйли,
            уровень внутри дня, большой сайз, или узкий рэнж    -   следует относится к этому с подозрением,
            знайте их видят миллионы других глаз.`,
        };

      case 'Insider_Own_percent':
        return {
          description: `количество акций в собственности инсайдеров`,
          interpretation: ``,
        };

      case 'Insider_Trans_percent':
        return {
          description: `изменения в количества акций в собственности инсайдеров (за 6 месяцев)`,
          interpretation: ``,
        };
      case 'Inst_Own_percent':
        return {
          description: `Количество акций находящиеся в институциональной собственности (в финансовых институтах и у институциональных инвесторов)`,
          interpretation: ``,
        };

      case 'Inst_Trans_percent':
        return {
          description: `Изменения в количестве в финансовых институтах и и институциональных инвесторов`,
          interpretation: ``,
        };

      case 'LT_Debt_Eq':
        return {
          description: `Коээфициент показывает колличество долга на акцию`,
          interpretation: `Оптимальным считается значение коэффициента в пределах 0,5-0,7`,
        };

      case 'Market_Cap':
        return {
          description: `Рыночная капитализация компании`,
          interpretation: `Подсчитывается путем умножения последней сделки по акциям компании на Shares Outstanding (общую эмиссию акций этой компании).
            Смотрим на капитализацию, тут примерно также как и с индексами, если капитализация большая
            значит компания серьёзная и привлекает больше инвесторов. Если капитализация меньше полу
            миллиарда, то скорее всего в такой акции меньше игроков и соответственно проще вычислить крупного.
            При использовании этого показателя при выборе компаний для инвестиций стоит учитывать некоторые минусы этой метрики.
            Рыночная капитализация не учитывает долги компании. Другими словами, в дополнение к  капитализации
            компания может иметь долгов на несколько десятков миллиардов долларов. То есть, чтобы понять истинную
            ценность компании, нужно сложить рыночную капитализацию и все долги.
            Полученное значение обычно и означает стоимость компании (Enterprise Value)`,
        };

      case 'Oper_Margin_percent':
        return {
          description: `Операционная рентабельность - отошение операционной прибыли компании к объему продаж,
           оказывает долю операционной прибыли в полученной выручке после вычета операционных расходов.
            Простыми словами рентабельность операционной прибыли демонстрирует,
           сколько генерирует компания операционной прибыли на одну единицу выручки.`,
          interpretation: `Значение больше 0% является нормой, чем выше тем лучше, сравнивается внутри одной отрасли`,
        };
      case 'Optionable':
        return {
          description: `Есть ли у бумаги торгующиеся опционы на бирже`,
          interpretation: `Если да, то это придает ликвидности и надёжности компании.`,
        };

      case 'PEG':
        return {
          description: `Используется для оценки акций, чтобы определить, насколько цена акций в данный момент переоценена или недооценена рынком`,
          interpretation: `Нopmaтивнoe знaчeниe PEG = 1. Этo знaчит, чтo пpи тakoм PEG komпaнию moжнo cчитaть aдekвaтнo oцeнённoй yчacтниkamи pынka. Чem мeньшe PEG, тem лyчшe для инвecтopa, отрицательное значение PEG интерпретировать бессмысленно`,
        };
      case 'P_B':
        return {
          description: `Price Book Value - показывает отношение рыночной стоимости акции
          к текущей стоимости чистых активов (собственный капитал). Чистые активы определяются как то,
          что останется у собственников компании после погашения своих обязательств Балансовая стоимость рассчитывается вычитанием из
           суммарных активов нематериальных активов и обязательств (краткосрочных и долгосрочных).`,
          interpretation: `"Не подходит для компаний инновационных, IT и биотехнологических компаний.
P/B<1        P/B > 1 Компания оценивается как дорогая. Инвестор переплачивает за акции
P/B=1        P/B = 1 Компания оценена справедливо
P/B<1        P/B < 1 Компания недооценена рынком. Инвестор покупает акции дешевле их внутренней стоимости
P/B<0        P/B < 0 Обязательства компании превышают свои активы. Возникновение риска банкротства
P/B>5        P/B > 5 Акции компании сильно переоценены."`,
        };
      case 'P_C':
        return {
          description: `Коэффициент отношения капитализации компании на фондовом рынке к ее выручке`,
          interpretation: `Показатель носит посредственную важность для анализа, так как не оценивает будущие денежные потоки, а учитывает только кэш`,
        };
      case 'P_E':
        return {
          description: `Финансовый показатель, равный отношению рыночной стоимости акции к годовой прибыли, полученной на акцию.`,
          interpretation: `"Сравнивается внутри отрасли, более низкое значение свидетельствует
          о недооценке и даже «дешевизне» акций, и наоборот
          Значение менее 15, что указывает на адекватную стоимость ценной бумаги. Если данное значение более 20,
          то это говорит о том, что рыночная стоимость организации превышает фактическую"`,
        };
      case 'P_FCF':
        return {
          description: `Коэффициент показывает соотношение цены с чистым финансовым потоком`,
          interpretation: `P/FCF < 20 – считается нормой, значение P/FCF < 15 говорит о том,
           что бизнес компании здоров и она имеет достаточно свободных средств,
            которые может направить на выплату дивидендов, осуществление buyback, либо сокращения долговой нагрузки,
             если такова имеется. Низкое значение P/FCF, как правило, означает,
           что акции компании являются недооцененными. Таким образом, чем ниже коэффициент, тем дешевле акции.`
        };
      case 'P_S':
        return {
          description: `Коэффициент отношения капитализации компании на фондовом рынке к ее выручке.
           Другими словами, показатель отражает, сколько платит инвестор за единицу выручки,
            рассчитывается как, отношение рыночной оценки компании к объему продаж`,
          interpretation: `общепринято считать, что нормой считается значение P/S<2.
           Нужно запомнить, что чем ниже данный показатель, тем лучше, и тем меньше
            инвестор платит за каждый рубль, получаемый компанией с продаж.
             При P/S < 1 есть возможность купить этот рубль с дисконтом , не применимо к банкам ,
              страховым и финансовым компаниям. Компании сравниваются внутри одной отрасли,
               Рекомендуется применять к компаниям,
           относящихся к сектору услуг, ритейлу к примеру, в области телекоммуникаций, продуктовым компаниям.`
        };

      case 'Payout_percent':
        return {
          description: `Коэффициент выплаты дивидендов. Процентная доля прибыли, выплаченная в качестве дивиденда`,
          interpretation: ``
        };

      case 'Perf_Half_Y_percent':
        return {
          description: `Параметр, который показывает доходность акции, за пол года`,
          interpretation: `Сравнимо для акций из одного сектора , чем выше % тем лучше.`
        };

      case 'Perf_Month_percent':
        return {
          description: `Параметр, который показывает доходность акции, за 1 месяц`,
          interpretation: `Сравнимо для акций из одного сектора , чем выше % тем лучше.`
        };

      case 'Perf_Quarter_percent':
        return {
          description: `Параметр, который показывает доходность акции, за 1 квартал`,
          interpretation: `Сравнимо для акций из одного сектора , чем выше % тем лучше.`
        };
      case 'Perf_Week_percent':
        return {
          description: `Параметр, который показывает доходность акции, за 1 неделю`,
          interpretation: `Сравнимо для акций из одного сектора , чем выше % тем лучше.`
        };
      case 'Perf_Year_percent':
        return {
          description: `Параметр, который показывает доходность акции, за 1 год`,
          interpretation: `Сравнимо для акций из одного сектора , чем выше % тем лучше.`
        };
      case 'Perf_YTD_percent':
        return {
          description: `YTD — year to date. Параметр, который показывает доходность акции с начала года по сегодняшний день.`,
          interpretation: `Сравнимо для акций из одного сектора , чем выше % тем лучше.`
        };
      case 'Prev_Close':
        return {
          description: `Цена закрытия прошлого дня`,
          interpretation: `Показывает цену , уровень закрытия вчерашнего дня, сильный уровень в интрадей трейдинге`
        };
      case 'Price':
        return {
          description: `Показатель текущей цены акции на рынке.`,
          interpretation: ``
        };
      case 'Profit_Margin_percent':
        return {
          description: `Чистая рентабельность - означает процентную долю выручки, которая остаётся у компании
          в виде чистой прибыли после вычета всех статей расходов`,
          interpretation: `Значение больше 0% является нормой, чем выше тем лучше, сравнивается внутри одной отрасли,
           отрицательное значение означает, что компания убыточна.`
        };
      case 'Quick_Ratio':
        return {
          description: `Показатель срочной ликвидности, позволяет находить наиболее ликвидные бумаги`,
          interpretation: `Говорит о том может ли компания погасить обязательства в короткий срок,
           если больше 1 то может, чем выше тем лучше`
        };

      case 'ROA_percent':
        return {
          description: `ROA (Return on Assets) – коэффициент рентабельности активов, показывающий процентное соотношение чистой прибыли предприятия к его общим активам (данные по балансу). Коэффициент ROA простыми словами – это финансовый показатель эффективности ведения бизнеса, который, фактически, говорит о результативности использования
           компанией своего имущества, включая кредитные заимствования.`,
          interpretation: `Сравнивается внутри отрасли, чем показатель выше, тем считается лучше`
        };
      case 'ROE_percent':
        return {
          description: `Рентабельность собственного капитала , рассчитывается как отношение чистой прибыли к капиталу. Возврат на вложенный капитал`,
          interpretation: `Показатель должен быть более 10% Это одно из наиболее важных значений,
           поскольку если отдача на капитал инвесторов менее доходности по низко рисковым активам,
           то торговля акциями в таком случае становится не рентабельной`
        };
      case 'ROI_percent':
        return {
          description: `ROI (от англ. return on investment) или ROR (англ. rate of return) — финансовый коэффициент,
           иллюстрирующий уровень доходности или убыточности бизнеса,
           учитывая сумму сделанных в этот бизнес инвестиций.`,
          interpretation: `Чем выше тем лучше`
        };
      case 'RSI_14':
        return {
          description: `Индекс относительной силы Тредна, показывает настроения рынка за 14 дней`,
          interpretation: `Значение 50 является балансом, значение 30 и ниже означает перепроданность , значение 70 и выше означает перекупленность `
        };
      case 'Recom':
        return {
          description: `Консенсус прогноз аналитиков по 5 бальной шкале`,
          interpretation: `1- покупать , 3 - держать, 5 продавать. `
        };
      case 'Rel_Volume':
        return {
          description: `Относительный объем (сегодняшний объем)`,
          interpretation: `Используется для сравнения объема за сегодня`
        };

      case 'SMA20_percent':
        return {
          description: `Расстояние от 20ти дневной скользящей средней (simple moving average)`,
          interpretation: `Если цена ниже средней, показывает недооценность, если выше переоцененность`
        };

      case 'SMA50_percent':
        return {
          description: `Расстояние от 50ти дневной скользящей средней (simple moving average)`,
          interpretation: `Если цена ниже средней, показывает недооценность, если выше переоцененность`
        };

      case 'SMA200_percent':
        return {
          description: `Расстояние от 200 дневной скользящей средней (simple moving average)`,
          interpretation: `Если цена ниже средней, показывает недооценность, если выше переоцененность`
        };
      case 'Sales':
        return {
          description: `Объем продаж`,
          interpretation: `Чем выше объем продаж у компании в одном секторе тем лучше.`
        };

      case 'Sales_Q_Q_percent':
        return {
          description: `Показатель квартальных продаж компании (выручка)`,
          interpretation: `Сравниваем внутри отрасли. Чем выше объем продаж у компании в одном секторе тем лучше.`
        };

      case 'Sales_past_5Y_percent':
        return {
          description: `Показатель продаж компании за последние 5 лет (выручка)`,
          interpretation: `Сравниваем внутри отрасли. Чем выше объем продаж у компании в одном секторе тем лучше.`
        };
      case 'Short_Float_percent':
        return {
          description: `Показывает какое количество акций сейчас торгуется в шорт в процентном соотношении.`,
          interpretation: `Данный показатель обновляется примерно 1 раз в две недели, показывает
           сколько шортов открыто в % от торгуемых акций`
        };

      case 'Short_Ratio':
        return {
          description: `Показывает преобладающие настроение инвесторов.
           Коэффициент рассчитывается путем деления акций проданных в шорт от общего объема сделок`,
          interpretation: `Значение до 10% является нормой, чем больше значение тем больше открыто шортов `
        };
      case 'Shortable':
        return {
          description: `Можно ли бумагу торговать в шорт (на понижение)`,
          interpretation: `Если да, то объемы торгов по бумаге будут больше, что придаст ликвидности.`
        };
      case 'Shs_Float':
        return {
          description: `Количество акций доступны для торговли на рынке`,
          interpretation: `Если колчиество торгуемых акций более 30% от выпущенных это хорошо.
          Если этот параметр мал, если средний дневной объём составляет более 1 % от него, то акция может быть манипулируема,
           какой-нибудь крупный игрок может двигать её.
          Кроме того в случае, если в акции сильно вырастет объём, она будет более волатильной, нежели акция с низким Shares Float.`
        };
      case 'Shs_Outstand':
        return {
          description: `"Показатель характеризует количество акций, выпущенных компанией,
          но находящихся на руках у частных инвесторов.Рассчитать этот показатель очень просто:
Shares Outstanding = Total Number Of Shares - Shares Held In Treasury
Те акции, которые компания выкупает у акционеров, выходят из числа акций в обращении и примыкают к числу собственных акций."`,
          interpretation: `Сколько всего выпущено акций`
        };
      case 'Target_Price_percent':
        return {
          description: `Целевая цена рассчитана аналитиками`,
          interpretation: `На эту цену ориентируется огромное количество инвесторов по всему миру,
          как правило target price обновляют раз в квартал или полугодие по факту выхода отчетности`
        };

      case 'Volatility':
        return {
          description: `Представляет собой меру риска использования финансового инструмента за заданный промежуток времени`,
          interpretation: `Чем выше значение, тем более рискованы вложения в бумагу, рассчитывается на неделю и месяц`
        };
      case 'Volume':
        return {
          description: `Объём торгов на фондовом рынке, рассчитывается как число акций,
           переходящее от продавцов к покупателям, то есть как торговый оборот внутри дня`,
          interpretation: `Показатель ликвидности, чем больше объем торгов , тем больше ликвидность акций`
        };

      case 'W_High_52_percent':
        return {
          description: `Расстояние от 52 недельного нижнего пика и верхнего пика`,
          interpretation: `Инвесторы могут проявлять повышенный интерес по мере приближения цены к высшей или низшей отметке.
           Популярной стратегией, которую используют фондовые трейдеры является покупка акций, когда цена превышает 52-недельный максимум,
           либо продажа, когда цена опускается ниже 52-недельного минимума.
           Смысл этой стратегии состоит в том, что если цена пробивает 52-недельную отметку (верхнюю или нижнюю) -
           это достаточный импульс для продолжения движения цены в благоприятном для трейдера направлении.
Возможен и другой вариант стратегии - продавать, когда цена достигает своего 52-недельного максимума из предположения,
 что стоимость будет понижаться, или покупать, когда цена достигает своего 52-недельного минимума в ожидании повышения.
 Трейдеры и инвесторы, как правило проводят дополнительный технический и / или фундаментальный анализ`
        };

      case 'W_Low_52_percent':
        return {
          description: `Расстояние от 52 недельного нижнего пика и верхнего пика`,
          interpretation: `Инвесторы могут проявлять повышенный интерес по мере приближения цены к высшей или низшей отметке.
           Популярной стратегией, которую используют фондовые трейдеры является покупка акций, когда цена превышает 52-недельный максимум,
           либо продажа, когда цена опускается ниже 52-недельного минимума.
           Смысл этой стратегии состоит в том, что если цена пробивает 52-недельную отметку (верхнюю или нижнюю) -
           это достаточный импульс для продолжения движения цены в благоприятном для трейдера направлении.
Возможен и другой вариант стратегии - продавать, когда цена достигает своего 52-недельного максимума из предположения,
 что стоимость будет понижаться, или покупать, когда цена достигает своего 52-недельного минимума в ожидании повышения.
 Трейдеры и инвесторы, как правило проводят дополнительный технический и / или фундаментальный анализ`
        };
      case 'W_Range_52':
        return {
          description: `52 недельный диапазон цены`,
          interpretation: `Показывает диапазон цен за 52 недели`
        };
      case 'companies':
        return {
          description: ``,
          interpretation: ``
        };
      default:
        return {
        description: ``,
        interpretation: ``
      };
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
      default:
        return key;
    }
  }

}
