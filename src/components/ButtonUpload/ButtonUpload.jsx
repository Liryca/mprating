import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { CloudUpload } from '@mui/icons-material';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  return (
    <Button className='but-start'
      component="label"
      variant="contained"
      style={{  background: '#2e7b60', display:'flex',flexDirection:'column'}}
      startIcon={<CloudUpload style={{ marginLeft: '0', marginRight:'0' }}/>}
    >
      <p>Выберите файл</p>
      <VisuallyHiddenInput     type="file" />
    </Button>
  );
}