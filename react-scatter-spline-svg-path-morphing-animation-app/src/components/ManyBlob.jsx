import {css} from '@emotion/css';
import {useEffect, useCallback, useMemo, useRef, useState} from 'react';
import {Blob} from './Blob';
import {Metaball} from './Metaball';

const ManyBlob = () => {
  const [viewbox, setViewbox] = useState(`0 0 ${window.innerWidth} ${window.innerHeight}`);
  const [size, setSize] = useState({width: window.innerWidth, height: window.innerHeight});

  const handleResize = useCallback(() => {
    setViewbox(`0 0 ${window.innerWidth} ${window.innerHeight}`);
    setSize({width: window.innerWidth, height: window.innerHeight});
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        <svg
          viewBox={viewbox}
          className={css`
            width: ${size.width}px;
            height: ${size.height}px;
          `}
        >
          <g filter={`url(#gooey)`}>
            <Blob size={170} edgeCount={6} deltaMorph={30} x={window.innerWidth * 0.01} y={window.innerHeight * 0.01} />
            <Blob size={170} edgeCount={3} deltaMorph={20} x={window.innerWidth * 0.65} y={window.innerHeight * 0.01} />
            <Blob size={180} edgeCount={4} deltaMorph={50} x={window.innerWidth * 0.31} y={window.innerHeight * 0.23} />
            <Blob size={80} edgeCount={6} deltaMorph={60} x={window.innerWidth * 0.21} y={window.innerHeight * 0.46} />
            <Blob size={80} edgeCount={6} deltaMorph={10} x={window.innerWidth * 0.01} y={window.innerHeight * 0.81} />
            <Blob size={100} edgeCount={5} deltaMorph={30} x={window.innerWidth * 0.21} y={window.innerHeight * 0.1} />
            <Blob size={80} edgeCount={6} deltaMorph={10} x={window.innerWidth * 0.39} y={window.innerHeight * 0.1} />
            <Blob size={80} edgeCount={3} deltaMorph={50} x={window.innerWidth * 0.3} y={window.innerHeight * 0.8} />
            <Blob size={80} edgeCount={6} deltaMorph={10} x={window.innerWidth * 0.5} y={window.innerHeight * 0.35} />
            <Blob size={80} edgeCount={4} deltaMorph={50} x={window.innerWidth * 0.58} y={window.innerHeight * 0.58} />
            <Blob size={180} edgeCount={4} deltaMorph={30} x={window.innerWidth * 0.78} y={window.innerHeight * 0.45} />
            <Blob size={80} edgeCount={6} deltaMorph={10} x={window.innerWidth * 0.8} y={window.innerHeight * 0.8} />
          </g>
        </svg>
      </div>
      <Metaball />
    </>
  );
};

export {ManyBlob};
