import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentRout: string;

  links = [
    { path: '/section-one', name: 'Section One' },
    { path: '/section-two', name: 'Section Two' },
  ];
  activeLink: any;
  constructor() {
    this.activeLink = this.links.filter(
      (link) => link.path === window.location.pathname
    );
  }
}
