import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserListComponent} from './user/user-list/user-list.component';
import {GroupMakerComponent} from './user/group-maker/group-maker.component';
import {CollectiveTaskComponent} from './user/collective-task/collective-task.component';
import {VotingComponent} from './user/voting/voting.component';
import {DetailComponent} from './user/detail/detail.component';

const routes: Routes = [
  {path: '', component: UserListComponent},
  {path: 'students', component: UserListComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'group-maker', component: GroupMakerComponent},
  {path: 'collective-task', component: CollectiveTaskComponent},
  {path: 'voting', component: VotingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
