import {Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input, numberAttribute} from '@angular/core';
import {EventGateway} from '../../core/ports/event.gateway';
import {Evenement} from '../models/evenement.model';
import {DatePipe} from '@angular/common';
import {CardModule} from 'primeng/card';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {rxResource} from '@angular/core/rxjs-interop';
import {SafeHtmlPipe} from '../../pipes/safehtml/safe-html-pipe.pipe';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ButtonModule} from 'primeng/button';
import 'add-to-calendar-button';
import dayjs from 'dayjs';

@Component({
  selector: 'app-evenement',
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  imports: [DatePipe, CardModule, SafeHtmlPipe, RouterLink, ProgressSpinnerModule, ButtonModule],
  templateUrl: './evenement-detail.component.html',
  styleUrl: './evenement-detail.component.css'
})
export class EvenementDetailComponent {

  private readonly eventGateway = inject(EventGateway);

  eventId = input(0, {
    alias: 'id',
    transform: numberAttribute}
  );


  evenementRessource = rxResource({
    // Define a reactive request computation.
    // The request value recomputes whenever any read signals change.
    request: () => ({id: this.eventId()}),
    // Define an async loader that retrieves data.
    // The resource calls this function every time the `request` value changes.
    loader: ({request}) => this.eventGateway.getEventById(request.id),
  });
  description = computed(() => this.evenementRessource.value()!.description);

  constructor() {
  }

  protected readonly dayjs = dayjs;
}
