import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {environment} from '../environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
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
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ImageCropperModule} from 'ngx-image-cropper';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import {AppComponent} from './app.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {PageTopComponent} from './page/page-top/page-top.component';
import {PageLoginComponent} from './page/page-login/page-login.component';
import {PageRegisterComponent} from './page/page-register/page-register.component';
import {GroupMakerComponent} from './user/group-maker/group-maker.component';
import {CollectiveTaskComponent} from './user/collective-task/collective-task.component';
import {VotingComponent} from './user/voting/voting.component';
import {DetailComponent} from './user/detail/detail.component';
import {MainUserComponent} from './page/main-user/main-user.component';
import {MainGroupMakerComponent} from './page/main-group-maker/main-group-maker.component';
import {UserGroupComponent} from './user/user-group/user-group.component';
import {DialogProfileComponent} from './user/dialog-profile/dialog-profile.component';
import {ResultSearchComponent} from './user/result-search/result-search.component';
import {DialogAlertComponent} from './component/dialog-alert/dialog-alert.component';
import {AuthService} from './services/auth/auth.service';
import {AuthGuard} from './services/auth/auth.guard';


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
    DialogProfileComponent,
    ResultSearchComponent,
    DialogAlertComponent,
    PageRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
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
    MatDividerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatTooltipModule,
    DragDropModule,
    ImageCropperModule,
    MatSnackBarModule,
    ScrollingModule
  ],
  entryComponents: [
    DialogProfileComponent,
    DialogAlertComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
