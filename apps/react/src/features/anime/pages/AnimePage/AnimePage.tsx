import { memo, FC } from 'react';
import { Button } from '@mui/material';

import { AuthService } from '../../../../api/services/authService';

/** Anime page component. */
const AnimePageComponent: FC = () => (
  <>
    <h1>Anime</h1>
    <Button
      variant="contained"
      type="button"
      onClick={() => AuthService.anime()}
    >
        Anime
    </Button>
  </>
);

export const AnimePage = memo(AnimePageComponent);
