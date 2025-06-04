import {Component, computed, effect, inject, input, Input} from '@angular/core';
import {Toolbar} from 'primeng/toolbar';
import {Calendar} from 'primeng/calendar';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DatePickerModule} from 'primeng/datepicker';
import {NgTemplateOutlet} from '@angular/common';
import {FloatLabel} from 'primeng/floatlabel';
import {Button} from 'primeng/button';
import {IftaLabel, IftaLabelModule} from 'primeng/iftalabel';
import {InputTextModule} from 'primeng/inputtext';
import {TextareaModule} from 'primeng/textarea';
import {EventGateway} from '../../core/ports/event.gateway';
import {Evenement} from '../models/evenement.model';
import {Router} from '@angular/router';
import dayjs from 'dayjs';
import {EditorModule} from 'primeng/editor';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';

@Component({
  selector: 'app-evenement-create-update-form',
  imports: [DatePickerModule, ReactiveFormsModule, EditorModule, Button, IftaLabelModule, InputTextModule],
  templateUrl: './evenement-create-update-form.component.html',
  styleUrl: './evenement-create-update-form.component.css'
})
export class EvenementCreateUpdateFormComponent {

  router = inject(Router);
  eventGateway = inject(EventGateway);
  eventIdPath = input<string | null>(null, {alias : "id"});
  eventId = computed(() => this.eventIdPath() ? +this.eventIdPath()! : null);

  eventForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required),
    hour: new FormControl(new Date(), Validators.required),
    location: new FormControl('', Validators.required),
  });

  evenementRessource = rxResource({
    // Define a reactive request computation.
    // The request value recomputes whenever any read signals change.
    request: () => ({id: this.eventId()}),
    // Define an async loader that retrieves data.
    // The resource calls this function every time the `request` value changes.
    loader: ({request}) => {
      return request.id ? this.eventGateway.getEventById(request.id) : of(null);
    },
  });

  isEdition = computed(() => !!this.eventId());

  //Comment faire le composant pour qu'il gère la création et la modification...
  constructor() {
    effect(() => {
      console.log('effect...')
      console.log(this.eventIdPath())
      console.log(this.eventId())
      console.log(this.evenementRessource.value())
      if(this.evenementRessource.hasValue() && this.evenementRessource.value() !== null) {
        //TODO pourquoi cette valeur est null ?
        const event = this.evenementRessource.value();
        this.eventForm.patchValue({
          title: event?.title,
          description: event?.description,
          date: event?.startDate,
          hour: event?.startDate,
          location: event?.location
        });
      }
    });
  }

  handleSubmit() {
    if (this.eventForm.invalid) {
      return;
    }
    const formValue = this.eventForm.value;
    const startDate = dayjs(formValue.date!).hour(formValue.hour!.getHours()).minute(formValue.hour!.getMinutes());

    const event: Evenement = {
      id: this.eventId(),
      title: formValue.title!,
      description: formValue.description!,
      startDate: startDate.toDate(),
      location: formValue.location!,
    }
    if(this.isEdition()) {
      this.eventGateway.updateEvent(event);
      this.router.navigate(['/', 'evenements', this.eventId()]);
    } else {
      this.eventGateway.createEvent(event);
      this.router.navigate(['/', 'evenements']);
    }
  }

}
