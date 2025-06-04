import {EventGateway} from '../ports/event.gateway';
import {Evenement} from '../../events/models/evenement.model';
import {list} from 'postcss';
import {delay, map, Observable, of} from 'rxjs';

export class InMemoryEventGateway extends EventGateway {

  delay: number = 100;
  evenements: Evenement[] = [];
  nextId: number = 1;

  override getAllEventsFrom(fromDate: Date): Observable<Map<Date, Evenement[]>> {
    console.log(this.evenements);
    this.evenements.sort((a, b) => {
      return a.startDate.getTime() - b.startDate.getTime();
    });
    let map = this.evenements.reduce((acc, event) => {
      let key = event.startDate;
      const list = acc.get(key.toDateString()) || [];
      list.push(event);
      acc.set(key.toDateString(), list);
      return acc;
    }, new Map<string, Evenement[]>());

    let result = new Map<Date, Evenement[]>();
    for (let [key, value] of map) {
      let date = new Date(key);
      result.set(date, value);
    }

    return of(result).pipe(delay(this.delay));
  }

  override getEventById(id: number): Observable<Evenement> {
    console.log(typeof id);
    return of(this.evenements.find(event => event.id === id)!)
      .pipe(delay(this.delay));
  }

  override createEvent(event: Evenement) {
    event.id = this.nextId++;
    this.evenements.push(event);
    console.log(this.evenements)
    //delay
    of(this.evenements)
      .pipe(delay(this.delay))
      .subscribe(() => {
      console.log('Event created');
    });
  }

  override updateEvent(event: Evenement): void {
    const index = this.evenements.findIndex(e => e.id === event.id);
    if (index !== -1) {
      console.log('Event updated !', event, this.evenements[index]);
      this.evenements[index] = event;
    }
    //delay
    of(this.evenements)
      .pipe(delay(this.delay))
      .subscribe(() => {
        console.log('Event updated');
      });
  }

  /*
  [
      {
        startDate: new Date('2025-05-01'),
        events : [
          {
            id: 1,
            title: 'Event 1',
            description: 'Description of Event 1'
          },
          {
            id: 2,
            title: 'Event 2',
            description: 'Description of Event 2'
          }
        ]
      },
      {
        startDate: new Date('2025-05-02'),
        events : [
          {
            id: 3,
            title: 'Event 3',
            description: 'Description of Event 3'
          },
          {
            id: 4,
            title: 'Event 4',
            description: 'Description of Event 4'
          }
        ]
      },
      {
        startDate: new Date('2025-05-05'),
        events : [
          {
            id: 5,
            title: 'Event 5',
            description: 'Description of Event 5'
          },
          {
            id: 6,
            title: 'Event 6',
            description: 'Description of Event 6'
          }
        ]
      }
    ]
   */

}
