import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {SignupComponent} from "./components/signup/signup.component";
import {IndexComponent} from "./components/index/index.component";
import {LoginComponent} from "./components/login/login.component";
import {MainComponent} from "./components/main/main.component";
import {DashboardHomeComponent} from "./components/dashboard-home/dashboard-home.component";
import {EventListComponent} from "./components/event-list/event-list.component";

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'search', component: MainComponent },
  { path: 'dashboard', component: DashboardHomeComponent },
  { path: 'dashboard/events', component: EventListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
