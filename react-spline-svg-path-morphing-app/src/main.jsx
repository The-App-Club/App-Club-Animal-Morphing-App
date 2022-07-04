import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import {useMemo, useRef, useState} from 'react';
import {Blob} from './components/Blob';
import '@fontsource/inter';
import './styles/index.scss';

const App = () => {
  return (
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
      <Blob size={100} edgeCount={5} />
      <Blob size={300} edgeCount={6} />
      <Blob size={50} edgeCount={4} />
      <Blob size={100} edgeCount={3} />
      <Blob size={200} edgeCount={6} />
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
