import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CollectiveTaskComponent} from './user/collective-task/collective-task.component';
import {VotingComponent} from './user/voting/voting.component';
import {MainUserComponent} from './page/main-user/main-user.component';
import {MainGroupMakerComponent} from './page/main-group-maker/main-group-maker.component';
import {PageLoginComponent} from './page/page-login/page-login.component';
import {PageRegisterComponent} from './page/page-register/page-register.component';
import {AccessGuard} from './guard/access.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: PageLoginComponent, data: {require: 'not logged'}, canActivate: [AccessGuard]},
  {path: 'register', component: PageRegisterComponent, data: {require: 'not logged'}, canActivate: [AccessGuard]},
  {path: 'students', component: MainUserComponent, data: {require: 'logged'}, canActivate: [AccessGuard]},
  {path: 'group-maker', component: MainGroupMakerComponent, data: {require: 'admin'}, canActivate: [AccessGuard]},
  // {path: 'collective-task', component: CollectiveTaskComponent},
  // {path: 'voting', component: VotingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
