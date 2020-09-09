import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-play-list-form',
  templateUrl: './play-list-form.component.html',
  styleUrls: ['./play-list-form.component.scss'],
})
export class PlayListFormComponent implements OnInit {
  playListForm: FormGroup;
  title: String;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PlayListFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    if (!this.data.playlist) {
      this.playListForm = this.formBuilder.group({
        name: [null, Validators.required],
        description: [null, Validators.required],
        songs: this.formBuilder.array([this.songFormBuilder()]),
      });
    } else {
      this.playListForm = this.formBuilder.group({
        name: [this.data.playlist.name, Validators.required],
        description: [this.data.playlist.description, Validators.required],
        songs: this.formBuilder.array(
          this.data.playlist.songs.map((song) =>
            this.formBuilder.group({
              title: [song.title, Validators.required],
              artist: [song.artist, Validators.required],
              duration: [
                song.duration,
                Validators.compose([Validators.required, Validators.min(0)]),
              ],
            })
          )
        ),
      });
    }
  }
  get songs() {
    return this.playListForm.get('songs') as FormArray;
  }
  songFormBuilder(): FormGroup {
    return this.formBuilder.group({
      title: [null, Validators.required],
      artist: [null, Validators.required],
      duration: [
        null,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
    });
  }

  createSong() {
    this.songs.push(this.songFormBuilder());
  }
  removeSong(index: number) {
    this.songs.removeAt(index);
  }
  cancel() {
    this.dialogRef.close();
  }
  submitHandler() {
    const formInput = this.playListForm.value;
    let duration = 0;
    let songsLength = formInput.songs.length;
    formInput.songs.forEach((song: Song) => {
      duration += song.duration;
    });
    if (this.playListForm.valid) {
      return {
        name: formInput.name,
        description: formInput.description,
        totalDuration: duration,
        totalSongs: songsLength,
        songs: formInput.songs,
        status: !this.data.playlist ? 'add' : 'edit',
      };
    }
  }
}
