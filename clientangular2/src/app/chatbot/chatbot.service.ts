  import { Injectable } from '@angular/core';
import {  Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import {Dialogue} from './dialog';
@Injectable()
export class ChatbotService {
  //serverURl = 'http://localhost:8888/RDV';
  serverURlBC = 'http://localhost:8889';

  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  reponseDuBot(step, dialogue, de): Dialogue {
      let response = new Dialogue();
      switch (step) {
         case 0 : response.addBotText('Pour quel sujet ?'); break;
         case 1 : response.addBotText('Pouvons nous faire un point téléphonique sur ce sujet ?'); break;
         case 2 : {
           response.addBotText('Trés bien , j\'en informe votre correspondant qui vous proposera des RDVs rapidement ');
           this.demandeDeRDVauCR(de); break;
         }
      }
      return response;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private demandeDeRDVauCR(de) {
    let service = 'rdv';
  /*  this.http.put(this.serverURlBC + '/' + service +'?amount=7' , {client : de})
              .toPromise()
              .then(response => response.json().data as any[])
              .catch(this.handleError);
  }*/
    const  rdvUnitaire = {'test': 1};
     this.http.get(this.serverURlBC + '/' + service ,  {headers: this.headers} )
              .toPromise()
              .then((response) =>{console.log(response)})//response.json().data as any[])
              .catch(this.handleError);
  }

  reponseDuBotScenario2(step, de): Dialogue {
    let response = new Dialogue();

  return response;
  }
  rdvEnAttente():Promise<Dialogue> {
     let service = 'mesrdv';
     console.log('appel');
     return this.http.get(this.serverURlBC + '/' + service ,  {headers: this.headers} )
              .toPromise()
              .then((response) =>{
                let body = response.json() as any;
              
                let responsebot = new Dialogue();
                responsebot.addBotText('Vous avez eu une demande de rdv de la part de : ' + body['from']);             
                return responsebot })//response.json().data as any[])
              .catch(this.handleError);
  }

}
