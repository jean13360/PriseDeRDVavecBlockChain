import { Component, Input, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Dialogue} from './dialog';
import {ChatbotService} from './chatbot.service';
import {Sse} from './sse';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
const EventSource: any = window['EventSource'];
@Component({
  selector: 'chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatBotComponent implements OnInit {
   userDialogue: string;
   listDialogue = [];
   step = 0;
   fxData: Observable<any>;
  

  @Input() idIndividu: any;
  @Input() scenario: any;

  constructor(private chatbot:ChatbotService, private sse: Sse)  {
      console.log("constructor");
      this.fxData = sse.observe('//localhost:8005/lowfreq').share();
  }

  ngOnInit() {
   
    let test = this.fxData.scan((acc, curr) => acc.set(curr.symbol, curr), new Map())
      .map(acc => Array.from(acc.values()));
    console.log(test);
    console.log(this.scenario);
       if (this.scenario === 2) {        
          this.userDialogue = "";
        } else {          
          this.userDialogue = "Je souhaite prendre RDV avec mon correspondant" 
        }
   }
    addAction() {
        let action = new Dialogue();
        action.addUserText(this.userDialogue);
        this.listDialogue.push(action);
        this.userDialogue = '';
        if (this.scenario === 1) {
          this.demandeReponseDuBot1();
        } else {
          this.demandeReponseDuBot2();
        }
    }
  
    refreshAction() {
     this.chatbot.rdvEnAttente().then(dialogue =>  this.listDialogue.push(dialogue));
  
    
    }
    demandeReponseDuBot1() {
      let  reponse = this.chatbot.reponseDuBot(this.step, this.listDialogue, this.idIndividu);

      this.listDialogue.push(reponse);    
      this.prepareDialogue1Suivant();    
    }

    prepareDialogue1Suivant() {
      switch (this.step) {
        case 0 : {this.userDialogue = 'J\'ai un soucis pour mon XXXXXXXX'; this.step = 1; break;}
        case 1 : {this.userDialogue = 'Oui'; this.step = 2; break;}
      }
    }

     demandeReponseDuBot2() {
       let reponse = this.chatbot.reponseDuBotScenario2(this.step, this.listDialogue);
      //let  reponse = this.chatbot.reponseDuBot(this.step, this.listDialogue, this.idIndividu);
      //this.listDialogue.push(reponse);    
      //this.prepareDialogue1Suivant();    
    }

}
