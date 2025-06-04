import {Evenement} from '../../events/models/evenement.model';
import {Observable} from 'rxjs';


export abstract class EventGateway {
  abstract updateEvent(event: Evenement) : void;
  abstract getAllEventsFrom(fromDate: Date): Observable<Map<Date, Evenement[]>>;
  abstract getEventById(id: number): Observable<Evenement>;
  abstract createEvent(event: Evenement): void;
}
