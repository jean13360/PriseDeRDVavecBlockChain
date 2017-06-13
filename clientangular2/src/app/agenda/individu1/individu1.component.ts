import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'agenda-1',
  templateUrl: './individu1.component.html',
  styleUrls: ['./individu1.component.css']
})

export class AgendaIndividu1Component implements OnInit{
  identifiant;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

   ngOnInit() {
      this.identifiant = this.route.snapshot.params['id'];
  }
}