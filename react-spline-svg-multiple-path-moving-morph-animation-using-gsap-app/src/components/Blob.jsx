import {useRef, useId, useEffect, useMemo, useState} from 'react';
import {css} from '@emotion/css';
import * as d3 from 'd3';
import gsap, {Power4} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {spline} from '@georgedoescode/spline';
import SimplexNoise from 'simplex-noise';
import {samples, interpolate, formatHex} from 'culori';
import {interpolate as map} from 'popmotion';

import cosme from '../assets/cosme.jpg';

const Blob = ({}) => {
  const count = useRef(null);
  const [doDense, setDoDense] = useState(null);
  const [resized, setResized] = useState(new Date());
  const reqId = useRef(null);
  const id = useId();
  const containerDomRef = useRef(null);
  const svgDomRef = useRef(null);
  const pathDomRef1 = useRef(null);
  const pathDomRef2 = useRef(null);
  const pathDomRef3 = useRef(null);
  const pathDomRef4 = useRef(null);
  const circleDomRef = useRef(null);

  const tl = useMemo(() => {
    return gsap.timeline({
      paused: true,
      onComplete: function () {
        gsap.to(containerDomRef.current, {
          opacity: 0,
          duration: 1,
        });
        // do notify after fade out
      },
    });
  }, []);

  const simplex = useMemo(() => {
    return new SimplexNoise();
  }, []);

  const noise = (x, y) => {
    return simplex.noise2D(x, y);
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

  useEffect(() => {
    const points1a = createPoints({
      edgeCount: 5,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: 0,
      offsetY: 0,
    });
    const points1b = createPoints({
      edgeCount: 5,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 80 : 120,
      offsetX: 0,
      offsetY: 0,
    });
    const points2a = createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 180,
      offsetX: 0,
      offsetY: 0,
    });
    const points2b = createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 100 : 220,
      offsetX: 0,
      offsetY: 0,
    });
    const points3a = createPoints({
      edgeCount: 4,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 180,
      offsetX: 0,
      offsetY: 0,
    });
    const points3b = createPoints({
      edgeCount: 4,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: 0,
      offsetY: 0,
    });
    const points4a = createPoints({
      edgeCount: 7,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 180,
      offsetX: 0,
      offsetY: 0,
    });
    const points4b = createPoints({
      edgeCount: 7,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 80 : 420,
      offsetX: 0,
      offsetY: 0,
    });
    const pathDom1 = pathDomRef1.current;
    const pathDom2 = pathDomRef2.current;
    const pathDom3 = pathDomRef3.current;
    const pathDom4 = pathDomRef4.current;
    const circleDom = circleDomRef.current;
    (function animate() {
      pathDom1.setAttribute('d', `${spline(points1b, 1, true)}`);
      pathDom2.setAttribute('d', `${spline(points2b, 1, true)}`);
      pathDom3.setAttribute('d', `${spline(points3b, 1, true)}`);
      pathDom4.setAttribute('d', `${spline(points3b, 1, true)}`);
      doNoise({points: points1b, amplitude: 20});
      doNoise({points: points2b, amplitude: 10});
      doNoise({points: points3b, amplitude: 30});
      doNoise({points: points4b, amplitude: 20});
      count.current = count.current + 1;
      if (count.current > 60 * 3) {
        window.cancelAnimationFrame(reqId.current);
        setDoDense(new Date());
        return;
      }
      reqId.current = window.requestAnimationFrame(animate);
    })();
    tl.fromTo(
      pathDom1,
      {
        ease: `none`,
        x: 100,
        y: 100,
        attr: {
          d: spline(points1a, 1, true),
        },
      },
      {
        ease: Power4.easeOut,
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2 - 100,
        attr: {
          d: spline(points1b, 1, true),
        },
        duration: 3,
      },
      'start'
    )
      .fromTo(
        pathDom2,
        {
          ease: `none`,
          x: window.innerWidth,
          y: 100,
          attr: {
            d: spline(points2a, 1, true),
          },
        },
        {
          ease: Power4.easeOut,
          x: window.innerWidth / 2 + 100,
          y: window.innerHeight / 2 + 100,
          attr: {
            d: spline(points2b, 1, true),
          },
          duration: 3,
        },
        'start=-1'
      )
      .fromTo(
        pathDom3,
        {
          ease: `none`,
          x: 100,
          y: window.innerHeight - 100,
          attr: {
            d: spline(points3a, 1, true),
          },
        },
        {
          ease: Power4.easeOut,
          x: window.innerWidth / 2 + 100,
          y: window.innerHeight / 2 - 100,
          attr: {
            d: spline(points3b, 1, true),
          },
          duration: 3,
        },
        'start=-1'
      )
      .fromTo(
        pathDom4,
        {
          ease: `none`,
          x: window.innerWidth - 100,
          y: window.innerHeight - 200,
          attr: {
            d: spline(points4a, 1, true),
          },
        },
        {
          ease: Power4.easeOut,
          x: window.innerWidth / 2 - 100,
          y: window.innerHeight / 2 + 100,
          attr: {
            d: spline(points4b, 1, true),
          },
          duration: 3,
        },
        'start=-1'
      )
      .to([pathDom4, pathDom3, pathDom2, pathDom1], {
        scale: 0,
        transformOrigin: `center center`,
        duration: 1.3,
        ease: Power4.easeOut,
      })
      .to(circleDom, {
        ease: Power4.easeOut,
        duration: 1.5,
        attr: {
          r: 1.4 * (Math.max(window.innerWidth, window.innerHeight) / 2),
        },
      });
    return () => {};
  }, [resized]);

  useEffect(() => {
    if (!doDense) {
      return;
    }
    tl.play();
  }, [doDense]);

  const handleResize = (e) => {
    setResized(new Date());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerDomRef}
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
          clip-path: url('#morph3');
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
          clip-path: url('#morph4');
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
          clip-path: url('#morph-final');
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
              ref={pathDomRef1}
              d={`M0,0Z`}
              className={css`
                stroke-linejoin: round;
              `}
            />
          </clipPath>
          <clipPath id={`morph2`}>
            <path
              ref={pathDomRef2}
              d={`M0,0Z`}
              className={css`
                stroke-linejoin: round;
              `}
            />
          </clipPath>
          <clipPath id={`morph3`}>
            <path
              ref={pathDomRef3}
              d={`M0,0Z`}
              className={css`
                stroke-linejoin: round;
              `}
            />
          </clipPath>
          <clipPath id={`morph4`}>
            <path
              ref={pathDomRef4}
              d={`M0,0Z`}
              className={css`
                stroke-linejoin: round;
              `}
            />
          </clipPath>
          {/* https://greensock.com/forums/topic/23449-scaling-a-masked-svg-from-the-center/?do=findComment&comment=110938&_rid=115212 */}
          <clipPath id={`morph-final`}>
            <circle
              ref={circleDomRef}
              r={0}
              cx={window.innerWidth / 2}
              cy={window.innerHeight / 2}
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export {Blob};
