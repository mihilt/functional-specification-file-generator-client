import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as xlsx from 'xlsx';

export default function Main() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadPath, setUploadPath] = useState('/Users/wonsik/dev');

  const [excelLevel3Data, setExcelLevel3Data]: [any, any] = useState();
  const [excelLevel4Data, setExcelLevel4Data]: [any, any] = useState();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const readUploadFile = (onChangeEvent: any) => {
    onChangeEvent.preventDefault();
    if (onChangeEvent.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target !== null) {
          const data = e.target.result;
          const workbook = xlsx.read(data, { type: 'array' });
          workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);
            if (sheetName === 'level3') {
              setExcelLevel3Data(json);
            } else if (sheetName === 'level4') {
              setExcelLevel4Data(json);
            }
          });
        }
      };
      reader.readAsArrayBuffer(onChangeEvent.target.files[0]);
    }
    setUploadedFileName(onChangeEvent.target.files[0].name);
  };

  useEffect(() => {
    const removeListener = window.electron.ipcRenderer.on('ipc-api', (arg) => {
      setIsLoading(false);

      // eslint-disable-next-line no-alert
      alert(arg);
    });

    return () => {
      if (removeListener !== undefined) {
        removeListener();
      }
    };
  }, []);

  return (
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
      <Grid container>
        <Grid item xs={5.5}>
          <Button variant="contained" component="label" sx={{ width: '100%' }}>
            Upload File
            <input
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              type="file"
              name="upload"
              hidden
              onChange={readUploadFile}
            />
          </Button>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5.5} sx={{ alignSelf: 'center' }}>
          {uploadedFileName === ''
            ? '선택된 파일이 없습니다.'
            : uploadedFileName}
        </Grid>
      </Grid>

      <TextField
        label="Path"
        variant="outlined"
        value={uploadPath}
        onChange={(e) => setUploadPath(e.target.value)}
        placeholder="파일 업로드 경로를 입력하세요."
        margin="normal"
        sx={{ width: '100%' }}
      />

      <LoadingButton
        loading={isLoading}
        variant="outlined"
        disabled={uploadedFileName === ''}
        sx={{ width: '100%' }}
        onClick={() => {
          setIsLoading(true);
          window.electron.ipcRenderer.sendMessage('ipc-api', [
            'generateFile',
            { excelLevel3Data, excelLevel4Data, uploadPath },
          ]);
        }}
      >
        generate
      </LoadingButton>

      {excelLevel3Data !== undefined &&
        excelLevel3Data.map((e: any) => (
          <div key={e.ID}>
            {e.ID} : {e.COMMENT}
          </div>
        ))}

      {excelLevel4Data !== undefined &&
        excelLevel4Data.map((e: any, i: number) => (
          <div key={e.LEVEL3_ID + e.ID}>
            {e.LEVEL3_ID} : {e.ID} : {e.COMMENT}
          </div>
        ))}
    </>
  );
}
