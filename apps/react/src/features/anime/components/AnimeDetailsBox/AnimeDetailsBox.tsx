import { fetchAnimeById } from '@js-camp/react/store/animeExtender/dispatchers';
import { selectAnimeById } from '@js-camp/react/store/animeExtender/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Box, Fab, Grid, Tooltip } from '@mui/material';
import { memo, FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { ModeEdit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import { AnimeDetailsPage } from '../AnimeDetails/AnimeDetails';

const INITIAL_ID = 0;

/** Anime details box description page component. */
const AnimeDetailsBoxPageComponent: FC = () => {
  const dispatch = useAppDispatch();

  const [id, setId] = useState(INITIAL_ID);
  const anime = useAppSelector(state => selectAnimeById(state, id));
  const [isAnime, setIsAnime] = useState(isEmpty(anime));

  const [searchParams] = useSearchParams();

  const buttonGroupStyles = {
    position: 'absolute',
    bottom: 15,
    right: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  };

  useEffect(() => {
    setIsAnime(isEmpty(anime));
  }, [anime]);

  useEffect(() => {
    const idParam = Number(searchParams.get('id'));
    if (idParam !== INITIAL_ID && idParam !== id) {
      setId(idParam);
      dispatch(fetchAnimeById(idParam));
    }
  }, [searchParams]);

  return (
    <Box>
      {isAnime ? (
        <p>Select an anime from the list</p>
      ) : (
        <AnimeDetailsPage anime={anime}></AnimeDetailsPage>
      )}
      <Grid container spacing={2} sx={buttonGroupStyles}>
        {isAnime || (
          <Grid item>
            <Tooltip title="Edit anime" arrow>
              <Fab color="primary" aria-label="add">
                <ModeEdit />
              </Fab>
            </Tooltip>
          </Grid>
        )}
        <Grid item>
          <Tooltip title="Add anime" arrow>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

export const AnimeDetailsBoxPage = memo(AnimeDetailsBoxPageComponent);
