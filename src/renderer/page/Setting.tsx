import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Setting() {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="outlined"
        sx={{ width: '100%' }}
        onClick={() => {
          navigate('/');
        }}
      >
        home
      </Button>
    </>
  );
}
