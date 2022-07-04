import {
  createRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {css} from '@emotion/css';
import {spline} from '@georgedoescode/spline';
import SimplexNoise from 'simplex-noise';
import {samples, interpolate, formatHex} from 'culori';
import {interpolate as map} from 'popmotion';

const Blob = ({
  size,
  edgeCount = 3,
  colorList = ['#FFE6E6', '#F2D1D1', '#DAEAF1', '#8CC0DE'],
  noiseStep = 0.005,
  count = 2,
}) => {
  const id = useId();

  const reqId = useRef(null);

  const niceSize = useMemo(() => {
    return size / count;
  }, [size, count]);

  const pathDomRefs = useMemo(() => {
    return [...Array(count)].map((_) => {
      return createRef();
    });
  }, []);

  const simplex = useMemo(() => {
    return new SimplexNoise();
  }, []);

  function noise(x, y) {
    return simplex.noise2D(x, y);
  }

  function createPoints() {
    const points = [];
    const angleStep = (Math.PI * 2) / edgeCount;
    const radius = niceSize * 0.8;
    for (let i = 1; i <= edgeCount; i++) {
      const theta = i * angleStep;

      const x = niceSize + Math.cos(theta) * radius;
      const y = niceSize + Math.sin(theta) * radius;

      points.push({
        x: x,
        y: y,
        originalX: x,
        originalY: y,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
      });
    }
    return points;
  }
  useEffect(() => {
    let hueNoiseOffset = 0;
    let noiseStep = 0.005;
    const points = createPoints();
    const pathDomList = pathDomRefs.map((pathDomRef) => {
      return pathDomRef.current;
    });
    (function animate() {
      for (let index = 0; index < pathDomList.length; index++) {
        const pathDom = pathDomList[index];
        pathDom.setAttribute('d', spline(points, 1, true));
      }
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
        const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
        const x = map(
          [-1, 1],
          [point.originalX - 20, point.originalX + 20]
        )(nX);
        const y = map(
          [-1, 1],
          [point.originalY - 20, point.originalY + 20]
        )(nY);
        point.x = x;
        point.y = y;
        point.noiseOffsetX += noiseStep;
        point.noiseOffsetY += noiseStep;
      }
      requestAnimationFrame(animate);
    })();
  }, []);

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
        <linearGradient id={`gradient-${id}`} gradientTransform="rotate(90)">
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
      <g filter={`url(#gooey)`} fill={`url(#gradient-${id})`}>
        {[...Array(count)].map((_, index) => {
          return (
            <g
              transform={`translate(${(niceSize + 25) * index} ${
                niceSize * index
              })`}
            >
              <path key={index} ref={pathDomRefs[index]} d={''}></path>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export {Blob};
