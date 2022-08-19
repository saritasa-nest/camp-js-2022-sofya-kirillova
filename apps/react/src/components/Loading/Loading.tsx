import { CircularProgress } from '@mui/material';
import { memo, FC } from 'react';

const LoadingComponent: FC = () => (
  <CircularProgress/>
);
export const Loading = memo(LoadingComponent);
