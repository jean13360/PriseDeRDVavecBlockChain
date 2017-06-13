import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {PageNotFoundComponent} from './pagenotfound/pagenotfound.component';
import { AppComponent } from './app.component';
import {AccueilComponent} from './accueil/accueil.component';
import {AngularMaterialModule} from './angular-material.module';
import {ScheduleModule} from 'primeng/primeng';
import {AgendaIndividu2Component} from './agenda/individu2/individu2.component';
import {AgendaIndividu1Component} from './agenda/individu1/individu1.component';
import {CalendrierComponent} from './agenda/calendrier/calendrier.component';
import {ChatBotComponent} from './chatbot/chatbot.component';
import {TimelineComponent} from './timeline/timeline.component';

import {ChatbotService} from './chatbot/chatbot.service';
import {Sse} from './chatbot/sse';
import { AppRoutingModule } from './app-routing.module';
import {HorizontalTimelineComponent} from './timeline/horizontal-timeline.component';
import { LoginComponent } from './auth/login/login.component';
@NgModule({
  declarations: [
    AppComponent
    , AccueilComponent
    , PageNotFoundComponent
    , AgendaIndividu1Component
    , AgendaIndividu2Component
    , LoginComponent
    , CalendrierComponent
    , ChatBotComponent
    , TimelineComponent
    , HorizontalTimelineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ScheduleModule,
    AngularMaterialModule
    , AppRoutingModule
  ],
  providers: [ChatbotService, Sse],
  bootstrap: [AppComponent]
})
export class AppModule { }
