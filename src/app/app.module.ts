import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { PageTopComponent } from './page/page-top/page-top.component';
import { PageLoginComponent } from './page/page-login/page-login.component';
import { GroupMakerComponent } from './user/group-maker/group-maker.component';
import { CollectiveTaskComponent } from './user/collective-task/collective-task.component';
import { VotingComponent } from './user/voting/voting.component';
import { DetailComponent } from './user/detail/detail.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    PageTopComponent,
    PageLoginComponent,
    GroupMakerComponent,
    CollectiveTaskComponent,
    VotingComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatFormField
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
