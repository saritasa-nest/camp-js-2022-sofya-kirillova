import { Component, OnInit } from '@angular/core';

import { DataService } from 'apps/angular/src/core/services/anime.service';

@Component({
  selector: 'camp-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
})
export class AnimeComponent implements OnInit {
  constructor(
    private readonly userService: DataService,
  ) {

  }

  ngOnInit(): void {
    console.log(45454);
    console.log(userService);
  }
}
