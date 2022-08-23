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
import React, { FC, memo } from 'react';
import { Order } from '@js-camp/core/models/animeSort';
import { AnimeType } from '@js-camp/core/models/animeCommon';

/** Anime details description page component. */
const AnimeListManagementComponent: FC = () => {
  const sortedData: readonly Order[] = [
    'titleEnglish',
    'status',
    'airedStart',
  ] as const;

  const typeList: readonly AnimeType[] = [
    AnimeType.Tv,
    AnimeType.Ova,
    AnimeType.Movie,
    AnimeType.Special,
    AnimeType.Ona,
    AnimeType.Music,
  ];
  const [types, setTypes] = React.useState<string[]>([]);
  const handleChangeType = (event: SelectChangeEvent<typeof types>) => {
    const {
      target: { value },
    } = event;
    setTypes(typeof value === 'string' ? value.split(',') : value);
  };

  const [sort, setSort] = React.useState('');
  const handleChangeSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
  };
  const [search, setSearch] = React.useState('');
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
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
        value={sort}
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
