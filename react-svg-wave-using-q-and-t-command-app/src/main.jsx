import {createRoot} from 'react-dom/client';
import '@fontsource/inter';
import './styles/index.scss';
import {css} from '@emotion/css';
import {useRef, useEffect, useState, useCallback} from 'react';
import {Slider} from '@mui/material';
import {transform} from 'framer-motion';
import * as d3 from 'd3';
import gsap from 'gsap';
import {samples, interpolate, formatHex} from 'culori';
import easing from 'bezier-easing';

const App = () => {
  const [progress, setProgress] = useState(0);
  const svgDomRef = useRef(null);

  const handleChange = (e) => {
    setProgress(e.target.value);
  };

  return (
    <>
      <div
        className={css`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          max-width: 20rem;
          padding: 3rem;
          z-index: 1;
        `}
      >
        <Slider
          defaultValue={0}
          min={0}
          max={1}
          step={0.01}
          value={progress}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handleChange}
        />
      </div>

      <div
        className={css`
          position: relative;
          width: 100%;
          height: 100vh;
          svg {
            width: 100%;
            height: 100vh;
            display: block;
          }
          image {
            width: 100%;
            height: 100%;
          }
        `}
      >
        <svg
          ref={svgDomRef}
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
              {samples(10)
                .map((n) => {
                  return {t: n};
                })
                .map((info) => {
                  return {
                    t: info.t,
                    color: interpolate(['#1F4690', '#3A5BA0', '#0AA1DD'])(
                      info.t
                    ),
                  };
                })
                .map((info) => {
                  return {...info, color: formatHex(info.color)};
                })
                .map((info, index) => {
                  return (
                    <stop
                      key={index}
                      offset={`${info.t * 100}%`}
                      stopColor={info.color}
                      stopOpacity={0.8}
                    />
                  );
                })}
            </linearGradient>
          </defs>
          {samples(15)
            .map(easing(0, 0, 0.18, 0.99))
            .map(transform([0, 1], [2, 7]))
            .map((n, index) => {
              const height = n * 10;
              return (
                <g key={index}>
                  <path
                    vectorEffect={'non-scaling-stroke'}
                    d={`M 0 100 V ${height} Q 14 ${transform(
                      [0, 1],
                      [height - 10, height + 10]
                    )(
                      progress
                    )} 22 ${height} T 40 ${height} T 60 ${height} T 80 ${height} T 100 ${height} L 100 100 Z`}
                    fill="url(#gradient)"
                  />
                </g>
              );
            })}
        </svg>
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
