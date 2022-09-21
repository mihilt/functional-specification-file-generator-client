import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          borderBottom: '1px solid #E0E0E0',
          marginBottom: '10px',
        }}
      >
        <Button
          sx={{ width: '100%', textAlign: 'center' }}
          onClick={() => {
            navigate('/');
          }}
        >
          홈
        </Button>
        <Button
          sx={{ width: '100%', textAlign: 'center' }}
          onClick={() => {
            navigate('setting');
          }}
        >
          세팅
        </Button>
      </Box>
    </>
  );
}
