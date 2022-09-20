import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Main() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const removeListener = window.electron.ipcRenderer.on('ipc-api', (arg) => {
      setIsLoading(false);
      alert('파일 생성 완료');
    });

    return () => {
      if (removeListener !== undefined) {
        removeListener();
      }
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Button
            variant="outlined"
            sx={{ width: '100%' }}
            onClick={() => {
              navigate('setting');
            }}
          >
            setting
          </Button>
          <Button
            variant="outlined"
            sx={{ width: '100%' }}
            onClick={() => {
              setIsLoading(true);
              window.electron.ipcRenderer.sendMessage('ipc-api', ['ping']);
            }}
          >
            generate
          </Button>
        </>
      )}
    </>
  );
}
