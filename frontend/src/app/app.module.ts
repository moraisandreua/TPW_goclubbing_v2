import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { AdsListComponent } from './components/ads-list/ads-list.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardHomeComponent,
    EventListComponent,
    AdsListComponent,
    CommentsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
