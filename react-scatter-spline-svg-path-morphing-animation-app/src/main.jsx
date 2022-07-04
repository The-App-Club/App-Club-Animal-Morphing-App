import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import {useEffect, useCallback, useMemo, useRef, useState} from 'react';
import {ManyBlob} from './components/ManyBlob';
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
      <ManyBlob />
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
