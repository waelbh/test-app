import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Playlist} from '../../models/playlist'
@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {
@Input() playList:Playlist
@Output() deleteHandler  = new EventEmitter();
@Output() editHandler  = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
