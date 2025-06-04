import {Component, inject} from '@angular/core';
import {NavigationEnd, Router, RouterModule, RouterOutlet} from '@angular/router';
import {EvenementsListComponent} from './events/evenements-list/evenements-list.component';
import {BottomMenuComponent} from './menu/bottom-menu/bottom-menu.component';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, BottomMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'alex-planning-front';

  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
  }
}
