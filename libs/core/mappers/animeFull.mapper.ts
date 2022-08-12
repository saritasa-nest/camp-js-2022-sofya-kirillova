import { AnimeCreateDto, AnimeFullDto } from '../dtos/animeFull.dto';
import { AnimeCreate, AnimeFull } from '../models/animeFull';

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

  /**
   * Maps model to dto.
   * @param model Anime model.
   */
  export function toDto(model: AnimeCreate): AnimeCreateDto {
    return {
      image: model.image ?? undefined,
      title_eng: model.titleEnglish ?? undefined,
      title_jpn: model.titleJapanese ?? undefined,
      type: AnimeCommonMapper.toDtoMapType[model.type],
      status: AnimeCommonMapper.toDtoMapStatus[model.status],
      aired: {
        start: model.airingStart === null ? null : model.airingStart.toISOString(),
        end: model.airingFinish === null ? null : model.airingFinish.toISOString(),
      },
      season: toDtoMapSeason[model.season],
      source: toDtoMapSource[model.source],
      rating: toDtoMapRating[model.rating],
      synopsis: model.synopsis,
      airing: model.airing,
      genres: model.genres,
      studios: model.studios,
    };
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

  const toDtoMapSource: Readonly<Record<AnimeSource, AnimeSourceDto>> = {
    [AnimeSource.FourKomaManga]: AnimeSourceDto.FourKomaManga,
    [AnimeSource.Book]: AnimeSourceDto.Book,
    [AnimeSource.CardGame]: AnimeSourceDto.CardGame,
    [AnimeSource.Game]: AnimeSourceDto.Game,
    [AnimeSource.LightNovel]: AnimeSourceDto.LightNovel,
    [AnimeSource.Manga]: AnimeSourceDto.Manga,
    [AnimeSource.MixedMedia]: AnimeSourceDto.MixedMedia,
    [AnimeSource.Music]: AnimeSourceDto.Music,
    [AnimeSource.Novel]: AnimeSourceDto.Novel,
    [AnimeSource.Original]: AnimeSourceDto.Original,
    [AnimeSource.PictureBook]: AnimeSourceDto.PictureBook,
    [AnimeSource.Radio]: AnimeSourceDto.Radio,
    [AnimeSource.VisualNovel]: AnimeSourceDto.VisualNovel,
    [AnimeSource.WebManga]: AnimeSourceDto.WebManga,
    [AnimeSource.WebNovel]: AnimeSourceDto.WebNovel,
    [AnimeSource.Other]: AnimeSourceDto.Other,
    [AnimeSource.Unknown]: AnimeSourceDto.Unknown,
  };

  const toDtoMapRating: Readonly<Record<AnimeRating, AnimeRatingDto>> = {
    [AnimeRating.G]: AnimeRatingDto.G,
    [AnimeRating.Pg]: AnimeRatingDto.Pg,
    [AnimeRating.Pg13]: AnimeRatingDto.Pg13,
    [AnimeRating.R17]: AnimeRatingDto.R17,
    [AnimeRating.RPlus]: AnimeRatingDto.RPlus,
    [AnimeRating.RX]: AnimeRatingDto.RX,
    [AnimeRating.Unknown]: AnimeRatingDto.Unknown,
  };

  const toDtoMapSeason: Readonly<Record<AnimeSeason, AnimeSeasonDto>> = {
    [AnimeSeason.Summer]: AnimeSeasonDto.Summer,
    [AnimeSeason.Winter]: AnimeSeasonDto.Winter,
    [AnimeSeason.Spring]: AnimeSeasonDto.Spring,
    [AnimeSeason.Fall]: AnimeSeasonDto.Fall,
    [AnimeSeason.NonSeasonal]: AnimeSeasonDto.NonSeasonal,
  };
}
