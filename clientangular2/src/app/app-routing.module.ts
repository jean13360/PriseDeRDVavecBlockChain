import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import {AgendaComponent} from './agenda2/agenda.component';
import {PageNotFoundComponent} from './pagenotfound/pagenotfound.component';
import {AccueilComponent} from './accueil/accueil.component';
import {AgendaIndividu2Component} from './agenda/individu2/individu2.component';
import {AgendaIndividu1Component} from './agenda/individu1/individu1.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService} from './auth/auth.service';

import { LoginComponent } from './auth/login/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full'}
  , { path: 'accueil', component: AccueilComponent}
  , { path: 'agenda1', component: AgendaIndividu1Component , canActivate: [AuthGuard]}
  , { path: 'agenda1/:id', component: AgendaIndividu1Component}
  , { path: 'agenda2', component: AgendaIndividu2Component/*, canActivate: [AuthGuard]*/}
  , { path: 'login', component: LoginComponent}
  , { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService]
})
export class AppRoutingModule {}
