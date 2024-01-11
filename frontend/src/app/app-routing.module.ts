import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslationComponent } from './components/translation/translation.component';
import { HomeComponent } from './components/home/home.component';
import { TeamsStandingComponent } from './components/teams-standing/teams-standing.component';

const routes: Routes = [
  { path: '', component: TeamsStandingComponent },
  { path: 'translation', component: TranslationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
