import { memo, FC } from 'react';
import { Button } from '@mui/material';
import { useAppSelector } from '@js-camp/react/store/store';

import { selectUser } from '@js-camp/react/store/auth/selectors';

import { AuthService } from '../../../../api/services/authService';

/** Anime page component. */
const AnimePageComponent: FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <h1>Anime</h1>
      <Button
        variant="contained"
        type="button"
        onClick={() => AuthService.anime()}
      >
        Anime
      </Button>
      <p>{user?.firstName ?? 55}</p>
      <p>{user?.lastName ?? 5854}</p>
    </>
  );
};

export const AnimePage = memo(AnimePageComponent);
