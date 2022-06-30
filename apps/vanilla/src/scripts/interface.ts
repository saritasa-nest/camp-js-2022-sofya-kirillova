
interface IAnimeTable {
  readonly count: number,
  readonly next: string | null,
  readonly previous: string | null,
  readonly results: readonly IAnime[]
  }
  interface IAnime {
    readonly image: string,
    readonly title_eng: string | null,
    readonly title_jpn: string | null,
    readonly type: string,
    readonly status: string,
    readonly aired: {
      start: string | null,
      end: string | null
    }
  }