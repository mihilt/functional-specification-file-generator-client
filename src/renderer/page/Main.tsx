import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Checkbox, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import * as xlsx from 'xlsx';

export default function Main() {
  const [isLoading, setIsLoading] = useState(false);

  const [backendUploadPath, setBackendUploadPath] = useState('');
  const [frontendUploadPath, setFrontendUploadPath] = useState('');

  const [uploadedFileName, setUploadedFileName] = useState('');

  const [excelLevel3Data, setExcelLevel3Data] = useState();
  const [excelLevel4Data, setExcelLevel4Data] = useState();

  const inputFileRef: any = useRef();

  const initialize = () => {
    inputFileRef.current.value = '';
    setUploadedFileName('');
    setExcelLevel3Data(undefined);
    setExcelLevel4Data(undefined);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const readUploadFile = (onChangeEvent: any) => {
    setExcelLevel3Data(undefined);
    setExcelLevel4Data(undefined);

    onChangeEvent.preventDefault();
    if (onChangeEvent.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target !== null) {
          const data = e.target.result;
          const workbook = xlsx.read(data, { type: 'array' });
          workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const json: any = xlsx.utils.sheet_to_json(worksheet);
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
    const removeGenerateFileIpc = window.electron.ipcRenderer.on(
      'generateFile',
      (arg) => {
        setIsLoading(false);
        // eslint-disable-next-line no-alert
        alert(arg);
      }
    );

    const removeGetOsInfoIpc = window.electron.ipcRenderer.on(
      'getOsInfo',
      (arg: any) => {
        setBackendUploadPath(`${arg.homedir}/Desktop`);
        setFrontendUploadPath(`${arg.homedir}/Desktop`);
      }
    );
    const removeGetFilePath = window.electron.ipcRenderer.on(
      'getFilePath',
      (arg: any) => {
        if (arg.arg[0].from === 'backEnd') {
          setBackendUploadPath(arg.directoryObject.filePaths[0]);
        } else if (arg.arg[0].from === 'frontEnd') {
          setFrontendUploadPath(arg.directoryObject.filePaths[0]);
        }
      }
    );

    window.electron.ipcRenderer.sendMessage('getOsInfo', []);

    return () => {
      if (removeGenerateFileIpc !== undefined) {
        removeGenerateFileIpc();
      }
      if (removeGetOsInfoIpc !== undefined) {
        removeGetOsInfoIpc();
      }
      if (removeGetFilePath !== undefined) {
        removeGetFilePath();
      }
    };
  }, []);

  return (
    <>
      <TextField
        label="백엔드 경로"
        variant="outlined"
        value={backendUploadPath}
        onClick={() => {
          window.electron.ipcRenderer.sendMessage('getFilePath', [
            { from: 'backEnd' },
          ]);
        }}
        placeholder="파일 업로드 경로를 입력하세요."
        sx={{ width: '100%', mt: 2 }}
      />

      <TextField
        label="프론트엔드 경로"
        variant="outlined"
        value={frontendUploadPath}
        onClick={() => {
          window.electron.ipcRenderer.sendMessage('getFilePath', [
            { from: 'frontEnd' },
          ]);
        }}
        placeholder="파일 업로드 경로를 입력하세요."
        sx={{ width: '100%', my: 2 }}
      />

      <TextField
        label="엑셀 파일"
        variant="outlined"
        disabled
        value={
          uploadedFileName === '' ? '선택된 파일이 없습니다.' : uploadedFileName
        }
        sx={{ width: '100%', mt: 2, mb: 1 }}
      />

      <Box sx={{ display: 'flex' }}>
        <Button variant="contained" component="label" sx={{ width: '100%' }}>
          파일 업로드
          <input
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            type="file"
            name="upload"
            hidden
            onChange={readUploadFile}
            ref={inputFileRef}
          />
        </Button>
        <Box sx={{ width: '100%' }} />
        <Button
          variant="outlined"
          sx={{ width: '100%' }}
          onClick={() => {
            initialize();
          }}
        >
          초기화
        </Button>
      </Box>
      <Box sx={{ borderBottom: '1px solid #E0E0E0', my: 3 }} />
      <Box
        sx={{
          border: '1px solid #E0E0E0',
          borderRadius: '5px',
          p: 1,
          fontSize: 14,
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              width: '100%',
              color: backendUploadPath !== '' ? 'blue' : 'red',
            }}
          >
            <Checkbox
              sx={{ p: 0 }}
              disabled
              checked={backendUploadPath !== ''}
            />
            백엔드 폴더 경로
          </Box>
          <Box
            sx={{
              width: '100%',
              color: frontendUploadPath !== '' ? 'blue' : 'red',
            }}
          >
            <Checkbox
              sx={{ p: 0 }}
              disabled
              checked={frontendUploadPath !== ''}
            />
            프론트엔드 폴더 경로
          </Box>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              width: '100%',
              color: uploadedFileName !== '' ? 'blue' : 'red',
            }}
          >
            <Checkbox
              sx={{ p: 0 }}
              disabled
              checked={uploadedFileName !== ''}
            />
            엑셀 파일 업로드 여부
          </Box>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              width: '100%',
              color: excelLevel3Data !== undefined ? 'blue' : 'red',
            }}
          >
            <Checkbox
              sx={{ p: 0 }}
              disabled
              checked={excelLevel3Data !== undefined}
            />
            엑셀 파일 level3 검증
          </Box>
          <Box
            sx={{
              width: '100%',
              color: excelLevel4Data !== undefined ? 'blue' : 'red',
            }}
          >
            <Checkbox
              sx={{ p: 0 }}
              disabled
              checked={excelLevel4Data !== undefined}
            />
            엑셀 파일 level4 검증
          </Box>
        </Box>
      </Box>

      <LoadingButton
        loading={isLoading}
        variant="outlined"
        disabled={
          uploadedFileName === '' ||
          excelLevel3Data === undefined ||
          excelLevel4Data === undefined
        }
        sx={{ width: '100%', my: 2 }}
        onClick={() => {
          setIsLoading(true);
          window.electron.ipcRenderer.sendMessage('generateFile', [
            {
              level3: excelLevel3Data,
              level4: excelLevel4Data,
              backendPath: backendUploadPath,
              frontendPath: frontendUploadPath,
            },
          ]);
        }}
      >
        파일 생성하기
      </LoadingButton>
    </>
  );
}
