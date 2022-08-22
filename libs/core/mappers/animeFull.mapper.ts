import { AnimeFullDto } from '../dtos/animeFull.dto';
import { AnimeFull } from '../models/animeFull';

import { StudioMapper } from './studio.mapper';
import { GenreMapper } from './genre.mapper';
import { AnimeSourceDto, AnimeRatingDto, AnimeSeasonDto } from './../dtos/animeFull.dto';
import { AnimeSource, AnimeRating, AnimeSeason } from './../models/animeFull';
import { AnimeCommonMapper } from './animeCommon.mapper';

export namespace AnimeFullMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeFullDto): AnimeFull {

    return new AnimeFull({
      id: dto.id,
      image: dto.image,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: AnimeCommonMapper.fromDtoMapType[dto.type],
      status: AnimeCommonMapper.fromDtoMapStatus[dto.status],
      airingStart: dto.aired.start === null ? null : new Date(dto.aired.start),
      airingFinish: dto.aired.end === null ? null : new Date(dto.aired.end),
      season: fromDtoMapSeason[dto.season],
      source: fromDtoMapSource[dto.source],
      rating: fromDtoMapRating[dto.rating],
      synopsis: dto.synopsis,
      airing: dto.airing,
      genres: dto.genres,
      studios: dto.studios,
      studiosData: dto.studios_data.map(studio => StudioMapper.fromDto(studio)),
      genresData: dto.genres_data.map(genre => GenreMapper.fromDto(genre)),
    });
  }

  const fromDtoMapSource: Readonly<Record<AnimeSourceDto, AnimeSource>> = {
    [AnimeSourceDto.FourKomaManga]: AnimeSource.FourKomaManga,
    [AnimeSourceDto.Book]: AnimeSource.Book,
    [AnimeSourceDto.CardGame]: AnimeSource.CardGame,
    [AnimeSourceDto.Game]: AnimeSource.Game,
    [AnimeSourceDto.LightNovel]: AnimeSource.LightNovel,
    [AnimeSourceDto.Manga]: AnimeSource.Manga,
    [AnimeSourceDto.MixedMedia]: AnimeSource.MixedMedia,
    [AnimeSourceDto.Music]: AnimeSource.Music,
    [AnimeSourceDto.Novel]: AnimeSource.Novel,
    [AnimeSourceDto.Original]: AnimeSource.Original,
    [AnimeSourceDto.PictureBook]: AnimeSource.PictureBook,
    [AnimeSourceDto.Radio]: AnimeSource.Radio,
    [AnimeSourceDto.VisualNovel]: AnimeSource.VisualNovel,
    [AnimeSourceDto.WebManga]: AnimeSource.WebManga,
    [AnimeSourceDto.WebNovel]: AnimeSource.WebNovel,
    [AnimeSourceDto.Other]: AnimeSource.Other,
    [AnimeSourceDto.Unknown]: AnimeSource.Unknown,
  };

  const fromDtoMapRating: Readonly<Record<AnimeRatingDto, AnimeRating>> = {
    [AnimeRatingDto.G]: AnimeRating.G,
    [AnimeRatingDto.Pg]: AnimeRating.Pg,
    [AnimeRatingDto.Pg13]: AnimeRating.Pg13,
    [AnimeRatingDto.R17]: AnimeRating.R17,
    [AnimeRatingDto.RPlus]: AnimeRating.RPlus,
    [AnimeRatingDto.RX]: AnimeRating.RX,
    [AnimeRatingDto.Unknown]: AnimeRating.Unknown,
  };

  const fromDtoMapSeason: Readonly<Record<AnimeSeasonDto, AnimeSeason>> = {
    [AnimeSeasonDto.Summer]: AnimeSeason.Summer,
    [AnimeSeasonDto.Winter]: AnimeSeason.Winter,
    [AnimeSeasonDto.Spring]: AnimeSeason.Spring,
    [AnimeSeasonDto.Fall]: AnimeSeason.Fall,
    [AnimeSeasonDto.NonSeasonal]: AnimeSeason.NonSeasonal,
  };
}
