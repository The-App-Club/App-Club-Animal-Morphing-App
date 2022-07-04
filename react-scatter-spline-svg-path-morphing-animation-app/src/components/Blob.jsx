import {useEffect, useId, useMemo, useRef} from 'react';
import {css} from '@emotion/css';
import {spline} from '@georgedoescode/spline';
import SimplexNoise from 'simplex-noise';
import {samples, interpolate, formatHex} from 'culori';
import {interpolate as map} from 'popmotion';

const Blob = ({size, edgeCount = 3, colorList = ['#FFE6E6', '#F2D1D1', '#DAEAF1', '#8CC0DE'], noiseStep = 0.005, deltaMorph = 50, x = 0, y = 0}) => {
  const id = useId();

  const reqId = useRef(null);
  const pathDomRef = useRef(null);

  const simplex = useMemo(() => {
    return new SimplexNoise();
  }, []);

  function noise(x, y) {
    return simplex.noise2D(x, y);
  }

  function createPoints() {
    const points = [];
    const angleStep = (Math.PI * 2) / edgeCount;
    const radius = size * 0.8;
    for (let i = 1; i <= edgeCount; i++) {
      const theta = i * angleStep;

      const x = size + Math.cos(theta) * radius;
      const y = size + Math.sin(theta) * radius;

      points.push({
        x: x,
        y: y,
        originalX: x,
        originalY: y,
        noiseOffsetX: Math.random() * 100,
        noiseOffsetY: Math.random() * 1000,
      });
    }
    return points;
  }
  useEffect(() => {
    const points = createPoints();
    const pathDom = pathDomRef.current;
    (function animate() {
      pathDom.setAttribute('d', spline(points, 1, true));
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
        const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
        const x = map([-1, 1], [point.originalX - deltaMorph, point.originalX + deltaMorph])(nX);
        const y = map([-1, 1], [point.originalY - deltaMorph, point.originalY + deltaMorph])(nY);
        point.x = x;
        point.y = y;
        point.noiseOffsetX += noiseStep;
        point.noiseOffsetY += noiseStep;
      }
      requestAnimationFrame(animate);
    })();
  }, []);

  return (
    <>
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
              return <stop key={index} offset={`${info.t * 100}%`} stopColor={info.color} stopOpacity={1} />;
            })}
        </linearGradient>
      </defs>
      <g fill={`url(#gradient-${id})`} transform={`translate(${x} ${y})`}>
        <path ref={pathDomRef} d={''}></path>
      </g>
    </>
  );
};

export {Blob};
