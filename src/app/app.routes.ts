import { Routes } from '@angular/router';
import {EvenementsListComponent} from './events/evenements-list/evenements-list.component';
import {NewsListComponent} from './news/news-list/news-list.component';
import {MyAccountComponent} from './user/my-account/my-account.component';
import {
  EvenementCreateUpdateFormComponent
} from './events/evenement-create-update-form/evenement-create-update-form.component';
import {EvenementDetailComponent} from './events/evenement-detail/evenement-detail.component';

export const routes: Routes = [
  { path: 'evenements', component: EvenementsListComponent },
  { path: 'actualites', component: NewsListComponent },
  { path: 'compte', component: MyAccountComponent },
  { path: 'evenements/create', component: EvenementCreateUpdateFormComponent },
  { path: 'evenements/:id', component: EvenementDetailComponent },
  { path: 'evenements/:id/edit', component: EvenementCreateUpdateFormComponent },
  { path: '', redirectTo: '/evenements/create', pathMatch: 'full' }
];
