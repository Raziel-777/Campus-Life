import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatOptionModule} from '@angular/material';
import {MatSelectModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {PageTopComponent} from './page/page-top/page-top.component';
import {PageLoginComponent} from './page/page-login/page-login.component';
import {GroupMakerComponent} from './user/group-maker/group-maker.component';
import {CollectiveTaskComponent} from './user/collective-task/collective-task.component';
import {VotingComponent} from './user/voting/voting.component';
import {DetailComponent} from './user/detail/detail.component';
import {MainUserComponent} from './page/main-user/main-user.component';
import {MainGroupMakerComponent} from './page/main-group-maker/main-group-maker.component';
import {UserGroupComponent} from './user/user-group/user-group.component';
import { PageBottomComponent } from './page/page-bottom/page-bottom.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    PageTopComponent,
    PageLoginComponent,
    GroupMakerComponent,
    CollectiveTaskComponent,
    VotingComponent,
    DetailComponent,
    MainUserComponent,
    MainGroupMakerComponent,
    UserGroupComponent,
    PageBottomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
