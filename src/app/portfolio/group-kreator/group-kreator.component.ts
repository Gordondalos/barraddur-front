import { Component, Input, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { MarketInstrument } from '../../interfaces/marketInstrument.interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-group-kreator',
  templateUrl: './group-kreator.component.html',
  styleUrls: ['./group-kreator.component.scss'],
})
export class GroupKreatorComponent implements OnInit {
  @Input() instruments: MarketInstrument[];

  group: MarketInstrument[] = [];
  groupSelecyted: MarketInstrument | any;
  options: MarketInstrument[] = [];
  copyOptions: MarketInstrument[] = [];
  groupName: string;
  currentGroup: any;

  constructor(private groupService: GroupService) {
  }

  async ngOnInit(): Promise<void> {
    this.options = this.instruments;
    this.copyOptions = _.cloneDeep(this.options);
  }

  addGroup() {
    if (this.groupSelecyted) {
      const figi = this.groupSelecyted.figi;
      let isFind = false;
      if (this.group.length > 0) {
        this.group.forEach((it, ind) => {
          if (it.figi === figi) {
            isFind = true;
          }
        });
        if (isFind === false) {
          this.group.push(this.groupSelecyted);
        }
        this.groupSelecyted = undefined;
      } else {
        this.group.push(this.groupSelecyted);
        this.groupSelecyted = undefined;
      }
    }
    this.createCurrentGroup();
  }

  displayFn(stock: MarketInstrument): string {
    return stock && stock.name ? stock.name : '';
  }

  delete(item: MarketInstrument, index) {
    // this.group.splice(index, 1);
    this.group.forEach((it, ind) => {
      if (it.figi === item.figi) {
        this.group.splice(ind, 1);
      }
    });
    this.createCurrentGroup();
  }

  filterOptions() {
    if (typeof this.groupSelecyted === 'string') {
      this.options = _.filter(this.copyOptions, (item) => {
        return item.name.toLowerCase().indexOf(this.groupSelecyted.toLowerCase()) !== -1 ||
          item.ticker.toLowerCase().indexOf(this.groupSelecyted.toLowerCase()) !== -1;
      });
    } else {
      this.options = _.cloneDeep(this.copyOptions);
    }
  }

  createCurrentGroup() {
    this.currentGroup = {
      name: this.groupName,
      children: this.group,
    };
    console.log(this.currentGroup);
  }

  async saveGroup() {
    this.createCurrentGroup();
    const res = await this.groupService.saveGroup(this.currentGroup);
    console.log(res);
  }
}
