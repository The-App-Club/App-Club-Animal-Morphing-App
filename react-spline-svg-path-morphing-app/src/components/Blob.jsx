import {useEffect, useMemo, useRef, useState} from 'react';
import {css} from '@emotion/css';
import {spline} from '@georgedoescode/spline';
import SimplexNoise from 'simplex-noise';
import {samples, interpolate, formatHex} from 'culori';

const Blob = ({
  size,
  edgeCount = 3,
  colorList = ['#FFE6E6', '#F2D1D1', '#DAEAF1', '#8CC0DE'],
}) => {
  const pathDomRef = useRef(null);
  const pathData = useMemo(() => {
    const points = [];
    const angleStep = (Math.PI * 2) / edgeCount;
    const radius = size;
    for (let i = 1; i <= edgeCount; i++) {
      const theta = i * angleStep;
      const x = size + Math.cos(theta) * radius;
      const y = size + Math.sin(theta) * radius;
      points.push({
        x,
        y,
      });
    }

    return spline(points, 1, true);
  }, [edgeCount]);

  return (
    <svg
      viewBox={`0 0 ${size * 2} ${size * 2}`}
      className={css`
        width: ${size}px;
        height: ${size}px;
        path {
        }
      `}
    >
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          {samples(10)
            .map((n) => {
              return {t: n};
            })
            .map((info) => {
              return {
                t: info.t,
                color: interpolate(colorList)(info.t),
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
                  stopOpacity={1}
                />
              );
            })}
        </linearGradient>
      </defs>
      <path ref={pathDomRef} d={pathData} fill="url('#gradient')"></path>
    </svg>
  );
};

export {Blob};
