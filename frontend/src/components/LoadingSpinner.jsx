import { CircularProgress, Box } from '@mui/material';

export default function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress size={60} thickness={4} />
    </Box>
  );
}
