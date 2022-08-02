import {useRef, useId, useEffect, useMemo, useState, forwardRef} from 'react';
import {css} from '@emotion/css';
import gsap, {Power4} from 'gsap';
import {spline} from '@georgedoescode/spline';
import SimplexNoise from 'simplex-noise';
import {interpolate as map} from 'popmotion';

import revealBg from '../assets/reveal-bg.jpg';
import revealBgSp from '../assets/reveal-bg-sp.jpg';

const _RevealCosme = ({isAnimate = false, notifier}, ref) => {
  const [doDense, setDoDense] = useState(null);
  const [resized, setResized] = useState(new Date());
  const reqId = useRef(null);
  const id = useId();
  const svgDomRef = useRef(null);
  const morphDomRef1 = useRef(null);
  const morphDomRef2 = useRef(null);
  const morphDomRef3 = useRef(null);
  const morphDomRef4 = useRef(null);
  const morphDomFinalRef = useRef(null);
  const pathDomRef1 = useRef(null);
  const pathDomRef2 = useRef(null);
  const pathDomRef3 = useRef(null);
  const pathDomRef4 = useRef(null);
  const circleDomRef = useRef(null);

  const tl = useMemo(() => {
    return gsap.timeline({
      paused: true,
      onComplete: function () {
        gsap.to(ref.current, {
          opacity: 0,
          duration: 1,
          onComplete: function () {
            if (reqId.current) {
              window.cancelAnimationFrame(reqId.current);
            }
            notifier();
          },
        });
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
  const points1a = useMemo(() => {
    return createPoints({
      edgeCount: 5,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: 0,
      offsetY: 0,
    });
  }, []);
  const points1b = useMemo(() => {
    return createPoints({
      edgeCount: 5,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 80 : 120,
      offsetX: 0,
      offsetY: 0,
    });
  }, []);
  const points2a = useMemo(() => {
    return createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 180,
      offsetX: 0,
      offsetY: 0,
    });
  }, []);

  const points2b = useMemo(() => {
    return createPoints({
      edgeCount: 6,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 100 : 220,
      offsetX: 0,
      offsetY: 0,
    });
  }, []);
  const points3a = useMemo(() => {
    return createPoints({
      edgeCount: 4,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 180,
      offsetX: 0,
      offsetY: 0,
    });
  }, []);

  const points3b = useMemo(() => {
    return createPoints({
      edgeCount: 4,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 220,
      offsetX: 0,
      offsetY: 0,
    });
  }, []);
  const points4a = useMemo(() => {
    return createPoints({
      edgeCount: 7,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 120 : 180,
      offsetX: 0,
      offsetY: 0,
    });
  }, []);
  const points4b = useMemo(() => {
    return createPoints({
      edgeCount: 7,
      radius: window.matchMedia(`(max-width: 768px)`).matches ? 80 : 200,
      offsetX: 0,
      offsetY: 0,
    });
  }, []);
  useEffect(() => {
    const morphDom1 = morphDomRef1.current;
    const morphDom2 = morphDomRef2.current;
    const morphDom3 = morphDomRef3.current;
    const morphDom4 = morphDomRef4.current;
    const morphDomFinal = morphDomFinalRef.current;
    const pathDom1 = pathDomRef1.current;
    const pathDom2 = pathDomRef2.current;
    const pathDom3 = pathDomRef3.current;
    const pathDom4 = pathDomRef4.current;

    if (isAnimate) {
      gsap
        .timeline()
        .set(pathDom1, {
          ease: `none`,
          x: 100,
          y: 100,
          attr: {
            d: spline(points1a, 1, true),
          },
        })
        .set(pathDom2, {
          ease: `none`,
          x: window.innerWidth,
          y: 100,
          attr: {
            d: spline(points2a, 1, true),
          },
        })
        .set(pathDom3, {
          ease: `none`,
          x: 100,
          y: window.innerHeight - 100,
          attr: {
            d: spline(points3a, 1, true),
          },
        })
        .set(pathDom4, {
          ease: `none`,
          x: window.innerWidth - 100,
          y: window.innerHeight - 200,
          attr: {
            d: spline(points4a, 1, true),
          },
        })
        .set([pathDom4, pathDom3, pathDom2, pathDom1], {
          scale: 0,
          opacity: 0,
          transformOrigin: `center center`,
        })
        .set([morphDom1, morphDom2, morphDom3, morphDom4, morphDomFinal], {
          opacity: 1,
        })
        .to([pathDom4, pathDom3, pathDom2, pathDom1], {
          scale: 1,
          opacity: 1,
          transformOrigin: `center center`,
          duration: 0.7,
          stagger: 0.3,
          ease: Power4.easeOut,
          onComplete: function () {
            setDoDense(new Date());
          },
        });
      (function animate() {
        pathDom1.setAttribute('d', `${spline(points1b, 1, true)}`);
        pathDom2.setAttribute('d', `${spline(points2b, 1, true)}`);
        pathDom3.setAttribute('d', `${spline(points3b, 1, true)}`);
        pathDom4.setAttribute('d', `${spline(points4b, 1, true)}`);
        doNoise({points: points1b, amplitude: 20});
        doNoise({points: points2b, amplitude: 10});
        doNoise({points: points3b, amplitude: 30});
        doNoise({points: points4b, amplitude: 20});
        reqId.current = window.requestAnimationFrame(animate);
      })();
    }
    return () => {
      if (reqId.current) {
        window.cancelAnimationFrame(reqId.current);
      }
    };
  }, [isAnimate]);

  useEffect(() => {
    const pathDom1 = pathDomRef1.current;
    const pathDom2 = pathDomRef2.current;
    const pathDom3 = pathDomRef3.current;
    const pathDom4 = pathDomRef4.current;
    const circleDom = circleDomRef.current;

    tl.to(
      pathDom1,
      {
        ease: Power4.easeOut,
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2 - 100,
        attr: {
          d: spline(points1b, 1, true),
        },
        duration: 1,
      },
      'start'
    )
      .to(
        pathDom2,

        {
          ease: Power4.easeOut,
          x: window.innerWidth / 2 + 100,
          y: window.innerHeight / 2 + 100,
          attr: {
            d: spline(points2b, 1, true),
          },
          duration: 1,
        },
        'start'
      )
      .to(
        pathDom3,
        {
          ease: Power4.easeOut,
          x: window.innerWidth / 2 + 100,
          y: window.innerHeight / 2 - 100,
          attr: {
            d: spline(points3b, 1, true),
          },
          duration: 1,
        },
        'start'
      )
      .to(
        pathDom4,
        {
          ease: Power4.easeOut,
          x: window.innerWidth / 2 - 100,
          y: window.innerHeight / 2 + 100,
          attr: {
            d: spline(points4b, 1, true),
          },
          duration: 1,
        },
        'start'
      )
      .to([pathDom4, pathDom3, pathDom2, pathDom1], {
        scale: 0,
        transformOrigin: `center center`,
        duration: 0.8,
        ease: Power4.easeOut,
      })
      .to(circleDom, {
        ease: Power4.easeOut,
        duration: 0.6,
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
      ref={ref}
      className={css`
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      `}
    >
      <div
        className={css`
          position: relative;
          width: 100%;
          min-height: 100vh;
        `}
      >
        <div
          ref={morphDomRef1}
          className={css`
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-image: url(${revealBg});
            @media (max-width: 768px) {
              background-image: url(${revealBgSp});
            }
            background-size: cover;
            filter: url('#gooey');
            clip-path: url('#morph');
          `}
        ></div>
        <div
          ref={morphDomRef2}
          className={css`
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-image: url(${revealBg});
            @media (max-width: 768px) {
              background-image: url(${revealBgSp});
            }
            background-size: cover;
            filter: url('#gooey');
            clip-path: url('#morph2');
          `}
        ></div>
        <div
          ref={morphDomRef3}
          className={css`
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-image: url(${revealBg});
            @media (max-width: 768px) {
              background-image: url(${revealBgSp});
            }
            background-size: cover;
            filter: url('#gooey');
            clip-path: url('#morph3');
          `}
        ></div>
        <div
          ref={morphDomRef4}
          className={css`
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-image: url(${revealBg});
            @media (max-width: 768px) {
              background-image: url(${revealBgSp});
            }
            background-size: cover;
            filter: url('#gooey');
            clip-path: url('#morph4');
          `}
        ></div>
        <div
          ref={morphDomFinalRef}
          className={css`
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-image: url(${revealBg});
            @media (max-width: 768px) {
              background-image: url(${revealBgSp});
            }
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
            path {
              opacity: 0;
              stroke-linejoin: round;
            }
          `}
        >
          {/* <defs>
            <filter id="gooey">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              ></feGaussianBlur>
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="gooey"
              ></feColorMatrix>
              <feComposite
                in="SourceGraphic"
                in2="gooey"
                operator="atop"
              ></feComposite>
            </filter>
          </defs> */}
          <defs>
            <clipPath id={`morph`}>
              <path ref={pathDomRef1} d={`M0,0Z`} className={css``} />
            </clipPath>
            <clipPath id={`morph2`}>
              <path ref={pathDomRef2} d={`M0,0Z`} className={css``} />
            </clipPath>
            <clipPath id={`morph3`}>
              <path ref={pathDomRef3} d={`M0,0Z`} className={css``} />
            </clipPath>
            <clipPath id={`morph4`}>
              <path ref={pathDomRef4} d={`M0,0Z`} className={css``} />
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
    </div>
  );
};

const RevealCosme = forwardRef(_RevealCosme);

export {RevealCosme};
