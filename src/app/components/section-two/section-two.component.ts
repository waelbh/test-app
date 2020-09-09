import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Playlist } from '../../models/playlist';
import { PlayListFormComponent } from '../play-list-form/play-list-form.component';
@Component({
  selector: 'app-section-two',
  templateUrl: './section-two.component.html',
  styleUrls: ['./section-two.component.scss'],
})
export class SectionTwoComponent implements OnInit {
  playlists: Playlist[] = [
    {
      name: 'Kopikustik',
      totalDuration: 5,
      totalSongs: 2,
      description:
        'More than a coffee, this is all of your favorite accoustic songs.',
      songs: [
        {
          title: 'Cigarettes of ours',
          artist: 'Ardhito Pramono',
          duration: 3,
        },
        {
          title: 'Walking Back Home',
          artist: 'Vira Talisa',
          duration: 2,
        },
      ],
    },
    {
      name: 'Anime Hits',
      totalDuration: 13,
      totalSongs: 3,
      description: 'Listen to your favorite Anime songs, all in one playlist.',
      songs: [
        {
          title: 'Renai Circulation',
          artist: 'Kana Hanazawa',
          duration: 4,
        },
        {
          title: 'Platinum Disco',
          artist: 'Tsukihi Phoenix',
          duration: 4,
        },
        {
          title: 'Silhouette',
          artist: 'KANA-BOON',
          duration: 5,
        },
      ],
    },
  ];
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  popUpForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      formTitle: 'Create New Playlist',
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(PlayListFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        if (result.status === 'add') {
          const playlist: Playlist = {
            name: result.name,
            description: result.description,
            totalDuration: result.totalDuration,
            totalSongs: result.totalSongs,
            songs: result.songs,
          };
          this.playlists.push(playlist);
        }
      }
    });
  }
  deleteHandler(index: number) {
    this.playlists.splice(index, 1);
  }
  editHandler(index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      formTitle: 'Edit Playlist',
      playlist: this.playlists[index],
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(PlayListFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        if (result.status === 'edit') {
          const playlist: Playlist = {
            name: result.name,
            description: result.description,
            totalDuration: result.totalDuration,
            totalSongs: result.totalSongs,
            songs: result.songs,
          };
          this.playlists[index] = playlist;
        }
      }
    });
  }
}
