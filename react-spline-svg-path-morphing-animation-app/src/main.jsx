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
          min-height: 100vh;
          width: 100%;
          justify-content: center;
          align-items: center;
          @media (max-width: 768px) {
            flex-direction: column;
          }
        `}
      >
        <Blob size={100} edgeCount={6} count={1} />
        <Blob
          size={100}
          edgeCount={6}
          count={2}
          colorList={['#8AC4D0', '#8AB6D6', '#2978B5', '#0061A8']}
        />
        <Blob
          size={100}
          edgeCount={4}
          count={3}
          colorList={['#8AC4D0', '#8AB6D6', '#2978B5', '#0061A8']}
        />
      </div>
      <svg>
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
