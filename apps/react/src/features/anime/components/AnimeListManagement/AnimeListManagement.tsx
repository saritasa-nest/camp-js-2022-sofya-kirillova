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
const DEFAULT_ORDER: Order = 'titleEnglish';
const DEFAULT_SEARCH = '';
const DEFAULT_TYPES: AnimeType[] = [];

/** Anime list management page component. */
const AnimeListManagementComponent: FC = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const initialAnimeParams = useRef<AnimeParams>({
    ordering: (params.get('ordering') as Order) ?? DEFAULT_ORDER,
    search: params.get('search') ?? DEFAULT_SEARCH,
    types: (params.getAll('types') as AnimeType[]) ?? DEFAULT_TYPES,
  });

  const [types, setTypes] = useState<string[]>(
    initialAnimeParams.current.types,
  );
  const handleChangeType = (event: SelectChangeEvent<typeof types>) => {
    const {
      target: { value },
    } = event;
    setTypes(typeof value === 'string' ? value.split(',') : value);
  };

  const [ordering, setOrdering] = useState<Order>(
    initialAnimeParams.current.ordering,
  );
  const handleChangeSort = (event: ChangeEvent<HTMLInputElement>) => {
    setOrdering(event.target.value as Order);
  };
  const [search, setSearch] = useState(initialAnimeParams.current.search);
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
        order: ordering,
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
