import {NgModule, Component, enableProdMode} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsDemoService, ComplaintsWithPercent} from './charts-demo.service';
import {DxChartModule} from 'devextreme-angular';
import {environment} from '../environments/environment';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';


@Component({
  selector: 'app-charts-demo',
  templateUrl: './charts-demo.component.html',
  styleUrls: ['./charts-demo.component.scss']
})
export class ChartsDemoComponent {
  dataSource: ComplaintsWithPercent[];

  constructor(service: ChartsDemoService) {
    this.dataSource = service.getComplaintsData();
  }

  customizeTooltip(info: any) {
    return {
      html: '<div><div class=\'tooltip-header\'>' +
        info.argumentText + '</div>' +
        '<div class=\'tooltip-body\'><div class=\'series-name\'>' +
        info.points[0].seriesName +
        ': </div><div class=\'value-text\'>' +
        info.points[0].valueText +
        '</div><div class=\'series-name\'>' +
        info.points[1].seriesName +
        ': </div><div class=\'value-text\'>' +
        info.points[1].valueText +
        '% </div></div></div>'
    };
  }

  customizeLabelText(info: any) {
    return info.valueText + '%';
  }
}

@NgModule({
  declarations: [
    ChartsDemoComponent
  ],
  providers: [
    ChartsDemoService
  ],
  imports: [
    CommonModule,
    BrowserModule,
    DxChartModule
  ],
  bootstrap: [
    ChartsDemoComponent
  ]
})
export class ChartsDemoModule {
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(ChartsDemoModule)
  .catch(err => console.error(err));
