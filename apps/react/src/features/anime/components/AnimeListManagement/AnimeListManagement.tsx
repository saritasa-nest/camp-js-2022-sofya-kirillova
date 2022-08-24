import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { ChangeEvent, FC, memo, useEffect, useRef, useState } from 'react';
import { Order } from '@js-camp/core/models/animeSort';
import { AnimeType } from '@js-camp/core/models/animeCommon';
import { useSearchParams } from 'react-router-dom';
import { fetchAnimeList } from '@js-camp/react/store/anime/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';

import { AnimeQueryParams, AnimeParams } from '../../../../model/AnimeParams';

const sortedData: readonly Order[] = [
  'titleEnglish',
  'status',
  'airedStart',
] as const;

const typeList: readonly AnimeType[] = Object.values(AnimeType);

/** Anime list management page component. */
const AnimeListManagementComponent: FC = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const getDefaultAnimeParams = useRef<AnimeParams>({
    ordering: (params.get('ordering') as Order) ?? 'titleEnglish',
    search: params.get('search') ?? '',
    types: (params.getAll('types') as AnimeType[]) ?? ([] as AnimeType[]),
  });

  const [types, setTypes] = useState<string[]>(
    getDefaultAnimeParams.current.types,
  );
  const handleChangeType = (event: SelectChangeEvent<typeof types>) => {
    const {
      target: { value },
    } = event;
    setTypes(typeof value === 'string' ? value.split(',') : value);
  };

  const [ordering, setOrdering] = useState(
    getDefaultAnimeParams.current.ordering,
  );
  const handleChangeSort = (event: ChangeEvent<HTMLInputElement>) => {
    setOrdering(event.target.value as Order);
  };
  const [search, setSearch] = useState(getDefaultAnimeParams.current.search);
  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    setParams({
      ordering,
      search,
      types,
    });
    const queryParams: AnimeQueryParams = {
      sort: {
        order: ordering as Order,
      },
      search,
      types: types as AnimeType[],
    };
    dispatch(fetchAnimeList(queryParams));
  }, [types, ordering, search]);

  return (
    <Grid
      container
      sx={{
        p: 1,
        boxSizing: 'border-box',
        justifyContent: 'space-between',
        maxWidth: '100%',
      }}
    >
      <TextField
        fullWidth
        id="standard-search"
        label="Search field"
        type="search"
        variant="standard"
        value={search}
        onChange={handleChangeSearch}
      />
      <TextField
        sx={{ minWidth: 150, marginTop: 1.5 }}
        id="outlined-select-currency"
        select
        label="Sorting"
        value={ordering}
        onChange={handleChangeSort}
      >
        {sortedData.map(order => (
          <MenuItem key={order} value={order}>
            {order}
          </MenuItem>
        ))}
      </TextField>
      <FormControl sx={{ width: 300, marginTop: 1.5 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={types}
          onChange={handleChangeType}
          input={<OutlinedInput label="Types" />}
          renderValue={selected => selected.join(', ')}
        >
          {typeList.map(type => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={types.includes(type)} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export const AnimeListManagementPage = memo(AnimeListManagementComponent);
