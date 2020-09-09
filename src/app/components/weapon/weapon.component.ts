import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Weapon } from 'src/app/models/weapon';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss'],
})
export class WeaponComponent implements OnInit {
  @Input() weapon: Weapon;
  @Output() addToCartClick = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
