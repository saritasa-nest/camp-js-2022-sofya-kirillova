interface IAnimeTable {
    image: string,
    title_eng: string,
    title_jpn: string,
    type: string,
    status: string,
    aired: {
      start: string,
      end: string
    }
  }