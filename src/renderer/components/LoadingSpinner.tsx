import { Box, CircularProgress } from '@mui/material';

export default function LoadingSpinner(): JSX.Element {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
