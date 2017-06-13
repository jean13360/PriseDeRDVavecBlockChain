
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MdIconModule} from '@angular/material';
import {MdInputModule,MdInputContainer} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import 'hammerjs';

@NgModule({
  declarations: [
  ],
  imports: [
   BrowserAnimationsModule, MdButtonModule
  ], 
  exports: [
    BrowserAnimationsModule, 
    MdIconModule,
    MdInputModule,
    MdCardModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: []
})
export class AngularMaterialModule { }
