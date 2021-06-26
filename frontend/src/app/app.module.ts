import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { EventListComponent } from './components/event-list/event-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardHomeComponent,
    EventListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
