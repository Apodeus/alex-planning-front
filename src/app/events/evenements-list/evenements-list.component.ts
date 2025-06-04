import {Component, inject} from '@angular/core';
import {EvenementComponent} from '../evenement-list-item-card/evenement.component';
import {DatePipe} from '@angular/common';
import {Divider} from 'primeng/divider';
import {EventGateway} from '../../core/ports/event.gateway';
import {Evenement} from '../models/evenement.model';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-evenements',
  imports: [EvenementComponent, DatePipe, Divider, Button, RouterLink],
  templateUrl: './evenements-list.component.html',
  styleUrl: './evenements-list.component.css'
})
export class EvenementsListComponent {

  private readonly eventGateway = inject(EventGateway);
  eventsByDate= toSignal(this.eventGateway.getAllEventsFrom(new Date()));

  constructor() {
  }

}
