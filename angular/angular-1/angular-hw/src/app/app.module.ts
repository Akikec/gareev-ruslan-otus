import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecentlyTabComponent } from './recently-tab/recently-tab.component';
import { GoTabComponent } from './go-tab/go-tab.component';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RecentlyTabComponent,
    GoTabComponent,
    SettingsTabComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
