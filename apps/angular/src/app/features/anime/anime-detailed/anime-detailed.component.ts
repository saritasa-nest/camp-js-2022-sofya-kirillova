import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Anime detailed component. */
@Component({
  selector: 'camp-anime-detailed',
  templateUrl: './anime-detailed.component.html',
  styleUrls: ['./anime-detailed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailedComponent {
  public constructor() {}
}
