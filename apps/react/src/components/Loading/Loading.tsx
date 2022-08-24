import { Box, LinearProgress } from '@mui/material';
import { memo, FC } from 'react';

const LoadingComponent: FC = () => (
  <Box sx={{ margin: '25px', boxSizing: 'border-box' }}>
    <LinearProgress/>
  </Box>
);
export const Loading = memo(LoadingComponent);
