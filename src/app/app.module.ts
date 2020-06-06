import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormConverterComponent } from './components/form-converter/form-converter.component';
import { CrossRatesComponent } from './components/cross-rates/cross-rates.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { LatestRatesComponent } from './components/latest-rates/latest-rates.component';
import { RateDynamicsComponent } from './components/rate-dynamics/rate-dynamics.component';
import { CalcService } from './services/calc.service';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormConverterComponent,
    CrossRatesComponent,
    LineChartComponent,
    LatestRatesComponent,
    RateDynamicsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ChartsModule,
    FormsModule
  ],
  providers: [ApiService, CalcService],
  bootstrap: [AppComponent]
})
export class AppModule { }
