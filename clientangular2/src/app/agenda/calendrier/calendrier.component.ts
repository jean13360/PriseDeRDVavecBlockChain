import { Component } from '@angular/core';

@Component({
  selector: 'calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent {
   header = {
        left: 'prev,next today',
        center: 'title',
        right: 'month, agendaWeek'
    };
    hiddenDays =[6, 0];
    vueParDefaut = 'agendaWeek';


    events: any[] = [
            {
                "title": "All Day Event",
                "start": "2017-05-01"
            },
            {
                "title": "Long Event",
                "start": "2017-05-07",
                "end": "2017-05-10"
            },
            {
                "title": "Repeating Event",
                "start": "2017-05-09T16:00:00"
            },
            {
                "title": "Repeating Event",
                "start": "2017-05-16T16:00:00"
            },
            {
                "title": "Conference",
                "start": "2017-05-11",
                "end": "2017-05-13"
            }
        ];
}
