import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrossRatesComponent } from './components/cross-rates/cross-rates.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { LatestRatesComponent } from './components/latest-rates/latest-rates.component';
import { FormConverterComponent } from './components/form-converter/form-converter.component';
import { RateDynamicsComponent } from './components/rate-dynamics/rate-dynamics.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', component: FormConverterComponent  },
  { path: 'home', component: FormConverterComponent  },
  { path: 'crossrates', component: CrossRatesComponent },
  { path: 'linechart', component: LineChartComponent },
  { path: 'latest', component: LatestRatesComponent },
  { path: 'rate-dynamics', component: RateDynamicsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
