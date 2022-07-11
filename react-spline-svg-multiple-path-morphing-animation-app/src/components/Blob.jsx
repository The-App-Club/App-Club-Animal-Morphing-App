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

import cosme from '../assets/cosme.jpg';

const Blob = ({
  colorList = ['#FFE6E6', '#F2D1D1', '#DAEAF1', '#8CC0DE'],
  noiseStep = 0.005,
  count = 2,
}) => {
  const [resized, setResized] = useState(new Date());

  const id = useId();
  const svgDomRef = useRef(null);
  const pathDomRef = useRef(null);

  const reqId = useRef(null);

  const simplex = useMemo(() => {
    return new SimplexNoise();
  }, []);

  const noise = (x, y) => {
    return simplex.noise2D(x, y);
  };

  const createPoints = ({edgeCount = 6, radius, offsetX, offsetY}) => {
    const points = [];
    const angleStep = (Math.PI * 2) / edgeCount;
    for (let i = 1; i <= edgeCount; i++) {
      const theta = i * angleStep;

      const x = offsetX + Math.cos(theta) * radius;
      const y = offsetY + Math.sin(theta) * radius;

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
  };

  const doNoise = ({points, noiseStep = 0.005, amplitude = 20}) => {
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
      const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
      const x = map(
        [-1, 1],
        [point.originalX - amplitude, point.originalX + amplitude]
      )(nX);
      const y = map(
        [-1, 1],
        [point.originalY - amplitude, point.originalY + amplitude]
      )(nY);
      point.x = x;
      point.y = y;
      point.noiseOffsetX += noiseStep;
      point.noiseOffsetY += noiseStep;
    }
  };

  const handleResize = (e) => {
    setResized(new Date());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let noiseStep = 0.005;
    const points1 = createPoints({
      edgeCount: 5,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: window.matchMedia(`(max-width: 768px)`).matches
        ? window.innerWidth / 2 + 120
        : window.innerWidth / 2,
      offsetY: window.matchMedia(`(max-width: 768px)`).matches
        ? window.innerHeight / 2 + 300
        : window.innerHeight / 2 + 150,
    });
    const points2 = createPoints({
      edgeCount: 5,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 80 : 120,
      offsetX: window.matchMedia(`(max-width: 768px)`).matches
        ? window.innerWidth / 2 - 150
        : window.innerWidth / 2 - 250,
      offsetY: window.matchMedia(`(max-width: 768px)`).matches
        ? window.innerHeight / 2 - 50
        : window.innerHeight / 2 - 100,
    });
    const points3 = createPoints({
      edgeCount: 8,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 60 : 125,
      offsetX: window.matchMedia(`(max-width: 768px)`).matches
        ? window.innerWidth / 2 + 100
        : window.innerWidth / 2 + 250,
      offsetY: window.matchMedia(`(max-width: 768px)`).matches
        ? window.innerHeight / 2 - 150
        : window.innerHeight / 2 - 150,
    });
    const points4 = createPoints({
      edgeCount: 4,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 110 : 220,
      offsetX: window.matchMedia(`(max-width: 768px)`).matches
        ? window.innerWidth - 100
        : 400,
      offsetY: window.matchMedia(`(max-width: 768px)`).matches
        ? 0
        : window.innerHeight / 2 - 200,
    });
    const points5 = createPoints({
      edgeCount: 5,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 90 : 180,
      offsetX: window.matchMedia(`(max-width: 768px)`).matches
        ? window.innerWidth / 2 - 100
        : 250,
      offsetY: window.matchMedia(`(max-width: 768px)`).matches
        ? window.innerHeight / 2 + 250
        : window.innerHeight - 250,
    });
    const points6 = createPoints({
      edgeCount: 9,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 80 : 200,
      offsetX: window.matchMedia(`(max-width: 768px)`).matches
        ? window.innerWidth / 2 + 50
        : window.innerWidth - 250,
      offsetY: window.matchMedia(`(max-width: 768px)`).matches
        ? window.innerHeight / 2 + 50
        : window.innerHeight - 220,
    });
    const points7 = createPoints({
      edgeCount: 9,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 100 : 200,
      offsetX: window.matchMedia(`(max-width: 768px)`).matches
        ? 100
        : window.innerWidth - 350,
      offsetY: window.matchMedia(`(max-width: 768px)`).matches ? 100 : 300,
    });
    const pathDom = pathDomRef.current;
    (function animate() {
      pathDom.setAttribute(
        'd',
        `${
          spline(points1, 1, true) +
          spline(points2, 1, true) +
          spline(points3, 1, true) +
          spline(points4, 1, true) +
          spline(points5, 1, true) +
          spline(points6, 1, true) +
          spline(points7, 1, true)
        }`
      );
      doNoise({noiseStep, points: points1, amplitude: 20});
      doNoise({noiseStep, points: points2, amplitude: 30});
      doNoise({noiseStep, points: points3, amplitude: 10});
      doNoise({noiseStep, points: points4, amplitude: 30});
      doNoise({noiseStep, points: points5, amplitude: 20});
      doNoise({noiseStep, points: points6, amplitude: 10});
      doNoise({noiseStep, points: points7, amplitude: 10});
      requestAnimationFrame(animate);
    })();
    return () => {};
  }, [resized]);

  return (
    <div
      className={css`
        position: relative;
        width: 100%;
        height: 100%;
      `}
    >
      <div
        className={css`
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-image: url(${cosme});
          background-size: cover;
          filter: url('#gooey');
          clip-path: url('#morph');
        `}
      ></div>
      <svg
        ref={svgDomRef}
        width={'100%'}
        height={'100%'}
        className={css`
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
        `}
      >
        <defs>
          <clipPath id={`morph`}>
            <path
              ref={pathDomRef}
              d={''}
              className={css`
                stroke-linejoin: round;
              `}
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export {Blob};
