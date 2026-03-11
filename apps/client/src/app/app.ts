import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/ui/elements/navbar/navbar';

import { FooterComponent } from './components/ui/elements/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('client');
}
