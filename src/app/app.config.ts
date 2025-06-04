import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import {EventGateway} from './core/ports/event.gateway';
import {InMemoryEventGateway} from './core/adapters/in-memory-event.gateway';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withRouterConfig({paramsInheritanceStrategy: 'always'})),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.p-dark' },
      }
    }),
    {
      provide: EventGateway, useFactory: () => {
        const gateway = new InMemoryEventGateway();
        gateway.evenements = [
          {
            id: 1,
            title: 'Event 1',
            description: 'Description of Event 1',
            startDate: new Date('2025-05-01'),
            location: 'Location 1'
          },
          {
            id: 2,
            title: 'Event 2',
            description: 'Description of Event 2',
            startDate: new Date('2025-05-01'),
            location: 'Location 2'
          },
          {
            id: 3,
            title: 'Event 3',
            description: 'Description of Event 3',
            startDate: new Date('2025-05-02'),
            location: 'Location 3'
          },
          {
            id: 4,
            title: 'Event 4',
            description: 'Description of Event 4',
            startDate: new Date('2025-05-02'),
            location: 'Location 4'
          },
          {
            id: 5,
            title: 'Event 5',
            description: 'Description of Event 5',
            startDate: new Date('2025-05-05'),
            location: 'Location 5'
          },
          {
            id: 6,
            title: 'Event 6',
            description: 'Description of Event 6',
            startDate: new Date('2025-05-05'),
            location: 'Location 6'
          },
          {
            id: 7,
            title: 'Event 7',
            description: 'Description of Event 7',
            startDate: new Date('2025-05-10'),
            location: 'Location 7'
          },
          {
            id: 8,
            title: 'Event 8',
            description: 'Description of Event 8',
            startDate: new Date('2025-05-10'),
            location: 'Location 8'
          },
          {
            id: 9,
            title: 'Event 9',
            description: 'Description of Event 9',
            startDate: new Date('2025-05-15'),
            location: 'Location 9'
          },
          /*{
            id: 10,
            title: 'Réunion chasses 2026',
            description: '<h3>Attention</h3><p><strong><em><u>Bonjour&nbsp;à&nbsp;tous</u></em></strong>,&nbsp;je&nbsp;vous&nbsp;propose&nbsp;qu&#39;on&nbsp;se&nbsp;retrouve&nbsp;tous&nbsp;à&nbsp;la&nbsp;mairie&nbsp;de&nbsp;Salles&nbsp;afin&nbsp;de&nbsp;faire&nbsp;un&nbsp;point&nbsp;sur&nbsp;la&nbsp;situation&nbsp;concernant&nbsp;le&nbsp;<span style="background-color: rgb(240, 102, 102);">budget&nbsp;chasse&nbsp;2026</span></p><ul><li><span style="color: rgb(240, 102, 102);">UN</span></li><li><span style="color: rgb(0, 71, 178);">DEUX</span></li><li><strong style="color: rgb(102, 185, 102);">TROIS</strong></li></ul>',
            startDate: new Date('2025-05-15'),
            location: 'Mairie de Salles'
          }*/
        ];
        gateway.nextId = gateway.evenements.map(event => event.id!).reduce((a, b) => Math.max(a, b), 0) + 1;
        return gateway;
      }
    }
  ]
};
