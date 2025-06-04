import {Component, inject, input, Input} from '@angular/core';
import {CardModule} from 'primeng/card';
import {SafeHtmlPipe} from '../../pipes/safehtml/safe-html-pipe.pipe';

@Component({
  selector: 'app-evenement',
  imports: [CardModule, SafeHtmlPipe],
  templateUrl: './evenement.component.html',
  styleUrl: './evenement.component.css'
})
export class EvenementComponent {

  title = input('');
  description = input('');
}
