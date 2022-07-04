import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import {Spacer} from './components/Spacer';
import {Bebep} from './components/Bebep';
import {
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Slider,
} from '@mui/material';
import * as d3 from 'd3';
import {transform} from 'framer-motion';
import '@fontsource/inter';
import './styles/index.scss';

const App = () => {
  const biscketAngle = 30;
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
          display: grid;
          place-items: center;
          min-height: 100vh;
          width: 100%;
        `}
      >
        <div
          className={css`
            position: relative;
          `}
        >
          {[...Array(360 / biscketAngle + 1)].map((_, index) => {
            return (
              <Bebep
                key={index}
                tik={tik}
                angle={-index * biscketAngle}
                biscketAngle={biscketAngle}
                distance={50}
                count={5}
                color={'blue'}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
