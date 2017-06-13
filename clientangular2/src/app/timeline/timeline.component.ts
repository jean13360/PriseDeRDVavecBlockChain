import { Component } from '@angular/core';
import {VisTimelineService, VisTimelineItems} from 'ng2-vis';
@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  content = `Description du RDV et  son etat à la date selectionné`;
  contentYYY = `Description du RDV et la raison de son annulation`;
  contentZZZ = `Description du RDV et le conclusion suite à l\'entretien`;
  contentAAA = `Absence programmé `

  timeline = [
    { caption: '3 Mar', date: new Date(2017, 4, 3), title: 'RDV de type YYY', content: this.contentYYY },
    { caption: '16 Mai', date: new Date(2017, 4, 16), title: 'RDV de type ZZZ', content: this.contentZZZ },
    { caption: 'Aujourd\'hui', date: new Date(), selected: true, title: 'RDV De type XXX', content: this.content },
    { caption: '10 aout', date: new Date(2017, 7, 10), title: 'Absence', content: this.contentAAA }
  ]
}
