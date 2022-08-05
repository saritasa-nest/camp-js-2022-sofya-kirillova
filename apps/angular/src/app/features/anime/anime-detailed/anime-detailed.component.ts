import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'camp-anime-detailed',
  templateUrl: './anime-detailed.component.html',
  styleUrls: ['./anime-detailed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailedComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
