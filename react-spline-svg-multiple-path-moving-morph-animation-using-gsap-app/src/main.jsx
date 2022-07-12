import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import {useMemo, useRef, useState} from 'react';
import {Blob} from './components/Blob';
import '@fontsource/inter';
import './styles/index.scss';

const App = () => {
  return (
    <>
      <div
        className={css`
          display: flex;
          height: 100vh;
          width: 100%;
          justify-content: center;
          align-items: center;
          @media (max-width: 768px) {
            flex-direction: column;
          }
        `}
      >
        <Blob />
      </div>
      <svg
        className={css`
          width: 0;
          height: 0;
        `}
      >
        <defs>
          <filter id="gooey">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="gooey"
            ></feColorMatrix>
            <feComposite
              in="SourceGraphic"
              in2="gooey"
              operator="atop"
            ></feComposite>
          </filter>
        </defs>
      </svg>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
