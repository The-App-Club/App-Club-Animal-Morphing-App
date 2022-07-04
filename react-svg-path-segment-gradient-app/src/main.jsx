import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import {Spacer} from './components/Spacer';
import {PathTransition} from './components/PathTransition';
import {
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Slider,
} from '@mui/material';
import {useInterval} from './hooks/useInterval';

import '@fontsource/inter';
import './styles/index.scss';

const App = () => {
  const [tik, setTik] = useState(new Date());
  const [progress, setProgress] = useState(1);

  const handleChange = (e) => {
    setProgress(e.target.value);
  };
  return (
    <>
      <Button
        variant={'outlined'}
        onClick={(e) => {
          setTik(new Date());
        }}
      >
        {'Do'}
      </Button>
      <div
        className={css`
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
          max-width: 40rem;
          padding: 60px;
          @media screen and (max-width: 768px) {
            max-width: 100%;
            padding: 1rem;
          }
        `}
      >
        <div
          className={css`
            width: 100%;
            padding: 1rem;
          `}
        >
          <Slider
            defaultValue={0}
            min={0}
            max={1}
            step={0.001}
            value={progress}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={handleChange}
          />
        </div>
        <PathTransition tik={tik} progress={progress} />
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
