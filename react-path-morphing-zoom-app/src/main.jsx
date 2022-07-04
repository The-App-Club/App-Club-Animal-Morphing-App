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
          min-height: 100vh;
          padding: 60px;
          @media screen and (max-width: 768px) {
            max-width: 100%;
            padding: 5px;
          }
        `}
      >
        <PathTransition tik={tik} />
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
