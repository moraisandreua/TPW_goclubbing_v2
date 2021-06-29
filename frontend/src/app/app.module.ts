import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { AdsListComponent } from './components/ads-list/ads-list.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import {FormsModule} from "@angular/forms";
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { EditAdComponent } from './components/edit-ad/edit-ad.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { NewAdComponent } from './components/new-ad/new-ad.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardHomeComponent,
    EventListComponent,
    AdsListComponent,
    CommentsListComponent,
    ProfileComponent,
    EditEventComponent,
    EditAdComponent,
    NewEventComponent,
    NewAdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
