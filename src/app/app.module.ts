import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { StatsService } from './service/stats.service';
import { CardComponent } from './card/card.component';
import { FormsModule } from '@angular/forms';
import { GyverToastrComponent } from './gyver-toastr/gyver-toastr.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    CardComponent,
    GyverToastrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
