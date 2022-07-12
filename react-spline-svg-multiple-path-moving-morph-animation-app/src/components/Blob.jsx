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

import gsap, {Power4} from 'gsap';
import * as d3 from 'd3';
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
  const pathDomRef2 = useRef(null);

  const reqId = useRef(null);

  const simplex = useMemo(() => {
    return new SimplexNoise();
  }, []);

  const noise = (x, y) => {
    return simplex.noise2D(x, y);
  };

  const tl = useMemo(() => {
    return gsap.timeline({
      paused: true,
      onStart: function () {
        console.log(`onStart`);
      },
      onComplete: function () {
        console.log(`onComplete`);
      },
    });
    // return gsap.timeline({paused: true, repeat: -1});
  }, []);

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
    const pathDom2 = pathDomRef2.current;
    (function animate() {
      pathDom2.setAttribute(
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

  useEffect(() => {
    let noiseStep = 0.005;
    const pathDom = pathDomRef.current;
    const points1PairsOffset = [
      {
        x: window.innerWidth / 2 + 220,
        y: window.innerHeight / 2 + 130,
      },
      {
        x: window.innerWidth / 2 + 20,
        y: window.innerHeight / 2 + 30,
      },
      {
        x: 220,
        y: 300,
      },
      {
        x: window.innerWidth / 2 + 220,
        y: window.innerHeight / 2 + 130,
      },
    ];
    const points2PairsOffset = [
      {
        x: window.innerWidth / 2 - 220,
        y: window.innerHeight / 2 - 130,
      },
      {
        x: window.innerWidth / 2 - 20,
        y: window.innerHeight / 2 - 30,
      },
      {
        x: window.innerWidth - 100,
        y: window.innerHeight - 100,
      },
      {
        x: window.innerWidth / 2 - 220,
        y: window.innerHeight / 2 - 130,
      },
    ];
    const points3PairsOffset = [
      {
        x: window.innerWidth / 2 + 220,
        y: window.innerHeight / 2 - 130,
      },
      {
        x: window.innerWidth / 2 + 20,
        y: window.innerHeight / 2 - 30,
      },
      {
        x: window.innerWidth - 100,
        y: 0,
      },
      {
        x: window.innerWidth / 2 + 220,
        y: window.innerHeight / 2 - 130,
      },
    ];
    const points4PairsOffset = [
      {
        x: window.innerWidth / 2 - 20,
        y: window.innerHeight / 2 + 30,
      },
      {
        x: 0,
        y: window.innerHeight,
      },
      {
        x: window.innerWidth / 2 - 220,
        y: window.innerHeight / 2 + 130,
      },
      {
        x: window.innerWidth / 2 - 20,
        y: window.innerHeight / 2 + 30,
      },
    ];

    const points1MoveXYList = d3.pairs(points1PairsOffset);
    const points2MoveXYList = d3.pairs(points2PairsOffset);
    const points3MoveXYList = d3.pairs(points3PairsOffset);
    const points4MoveXYList = d3.pairs(points4PairsOffset);

    const points1a = createPoints({
      edgeCount: 5,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: points1MoveXYList[0][0].x,
      offsetY: points1MoveXYList[0][0].y,
    });
    const points1b = createPoints({
      edgeCount: 5,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: points1MoveXYList[0][1].x,
      offsetY: points1MoveXYList[0][1].y,
    });
    const points1c = createPoints({
      edgeCount: 5,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: points1MoveXYList[1][0].x,
      offsetY: points1MoveXYList[1][0].y,
    });
    const points1d = createPoints({
      edgeCount: 5,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: points1MoveXYList[1][1].x,
      offsetY: points1MoveXYList[1][1].y,
    });
    const points1e = createPoints({
      edgeCount: 5,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: points1MoveXYList[2][0].x,
      offsetY: points1MoveXYList[2][0].y,
    });
    const points1f = createPoints({
      edgeCount: 5,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: points1MoveXYList[2][1].x,
      offsetY: points1MoveXYList[2][1].y,
    });

    const points2a = createPoints({
      edgeCount: 4,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 320,
      offsetX: points2MoveXYList[0][0].x,
      offsetY: points2MoveXYList[0][0].y,
    });
    const points2b = createPoints({
      edgeCount: 4,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 320,
      offsetX: points2MoveXYList[0][1].x,
      offsetY: points2MoveXYList[0][1].y,
    });
    const points2c = createPoints({
      edgeCount: 4,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 320,
      offsetX: points2MoveXYList[1][0].x,
      offsetY: points2MoveXYList[1][0].y,
    });
    const points2d = createPoints({
      edgeCount: 4,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 320,
      offsetX: points2MoveXYList[1][1].x,
      offsetY: points2MoveXYList[1][1].y,
    });
    const points2e = createPoints({
      edgeCount: 4,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 320,
      offsetX: points2MoveXYList[2][0].x,
      offsetY: points2MoveXYList[2][0].y,
    });
    const points2f = createPoints({
      edgeCount: 4,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 320,
      offsetX: points2MoveXYList[2][1].x,
      offsetY: points2MoveXYList[2][1].y,
    });

    const points3a = createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: points3MoveXYList[0][0].x,
      offsetY: points3MoveXYList[0][0].y,
    });
    const points3b = createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: points3MoveXYList[0][1].x,
      offsetY: points3MoveXYList[0][1].y,
    });
    const points3c = createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: points3MoveXYList[1][0].x,
      offsetY: points3MoveXYList[1][0].y,
    });
    const points3d = createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: points3MoveXYList[1][1].x,
      offsetY: points3MoveXYList[1][1].y,
    });
    const points3e = createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: points3MoveXYList[2][0].x,
      offsetY: points3MoveXYList[2][0].y,
    });
    const points3f = createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: points3MoveXYList[2][1].x,
      offsetY: points3MoveXYList[2][1].y,
    });

    const points4a = createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: points4MoveXYList[0][0].x,
      offsetY: points4MoveXYList[0][0].y,
    });
    const points4b = createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: points4MoveXYList[0][1].x,
      offsetY: points4MoveXYList[0][1].y,
    });
    const points4c = createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: points4MoveXYList[1][0].x,
      offsetY: points4MoveXYList[1][0].y,
    });
    const points4d = createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 320,
      offsetX: points4MoveXYList[1][1].x,
      offsetY: points4MoveXYList[1][1].y,
    });
    const points4e = createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 320,
      offsetX: points4MoveXYList[2][0].x,
      offsetY: points4MoveXYList[2][0].y,
    });
    const points4f = createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 320,
      offsetX: points4MoveXYList[2][1].x,
      offsetY: points4MoveXYList[2][1].y,
    });
    const a =
      spline(points1a, 1, true) +
      spline(points2a, 1, true) +
      spline(points3a, 1, true) +
      spline(points4a, 1, true);
    const b =
      spline(points1b, 1, true) +
      spline(points2b, 1, true) +
      spline(points3b, 1, true) +
      spline(points4b, 1, true);
    const c =
      spline(points1c, 1, true) +
      spline(points2c, 1, true) +
      spline(points3c, 1, true) +
      spline(points4c, 1, true);
    const d =
      spline(points1d, 1, true) +
      spline(points2d, 1, true) +
      spline(points3d, 1, true) +
      spline(points4d, 1, true);
    const e =
      spline(points1e, 1, true) +
      spline(points2e, 1, true) +
      spline(points3e, 1, true) +
      spline(points4e, 1, true);
    const f =
      spline(points1f, 1, true) +
      spline(points2f, 1, true) +
      spline(points3f, 1, true) +
      spline(points4f, 1, true);
    tl.to(pathDom, {
      attr: {d: b},
      duration: 1.2,
      ease: Power4.easeOut,
    })
      .to(pathDom, {
        attr: {d: b},
        duration: 0.7,
        ease: Power4.easeOut,
      })
      .to(pathDom, {
        attr: {d: c},
        duration: 1.2,
        ease: Power4.easeOut,
      })
      .to(pathDom, {
        attr: {d: d},
        duration: 1.2,
        ease: Power4.easeOut,
      })
      .to(pathDom, {
        attr: {d: e},
        duration: 0.8,
        ease: Power4.easeOut,
      })
      .to(pathDom, {
        attr: {d: f},
        duration: 1.2,
        ease: Power4.easeOut,
      });
    pathDom.setAttribute('d', `${a}`);
    setTimeout(() => {
      tl.play();
    }, 1400);
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
          clip-path: url('#morph2');
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
          <clipPath id={`morph2`}>
            <path
              ref={pathDomRef2}
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
