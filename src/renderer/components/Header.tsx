import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Header(): JSX.Element {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          >
            LogisValley
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
