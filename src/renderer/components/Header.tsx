import { AppBar, Box, Toolbar } from '@mui/material';

export default function Header(): JSX.Element {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              fontSize: 18,
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          >
            Instaports File Generator
          </Box>
          <Box
            sx={{
              fontSize: 12,
              position: 'absolute',
              left: '50%',
              top: '75%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          >
            LogisValley
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
