import {css} from '@emotion/css';
import {useRef, useEffect, useState, useCallback} from 'react';
import * as d3 from 'd3';
import {useResizeObserver} from '../hooks/useResizeObserver';
import {interpolatePath} from 'd3-interpolate-path';
import {transform} from 'framer-motion';
import {samples, interpolate, formatHex} from 'culori';
import easing from 'bezier-easing';
import * as turf from '@turf/turf';

import {GradientPath} from 'gradient-path/dist/index.esm.js';

const makeGradient = (step, interpolateColor) => {
  const bezier = easing(0, 0, 0.18, 0.99);
  const result = samples(step)
    .map(bezier)
    .map(transform([0, 1], [0.1, 0.9]))
    .map((t) => {
      return {t, color: interpolateColor(t)};
    })
    .map((info) => {
      return {...info, color: formatHex(info.color)};
    });
  return result;
};

const width = 100;
const height = 60;

const PathTransition = ({tik, step}) => {
  const svgDomRef = useRef();
  const wrapperRef = useRef();
  const stageDomRef = useRef();
  const pathDomRef = useRef();
  const dimensions = useResizeObserver({ref: wrapperRef});
  const originalPathRef = useRef(
    `M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z`
  );
  const [pathData, setPathData] = useState(originalPathRef.current);

  useEffect(() => {
    const svg = svgDomRef.current;

    const {xMin, xMax, yMin, yMax} = [...svg.children].reduce(
      (acc, el) => {
        const {x, y, width, height} = el.getBBox();
        if (!acc.xMin || x < acc.xMin) {
          acc.xMin = x;
        }
        if (!acc.xMax || x + width > acc.xMax) {
          acc.xMax = x + width;
        }
        if (!acc.yMin || y < acc.yMin) {
          acc.yMin = y;
        }
        if (!acc.yMax || y + height > acc.yMax) {
          acc.yMax = y + height;
        }
        return acc;
      },
      {xMin: 0, yMin: 0, xMax: width, yMax: height}
    );
    const gutter = 5;
    const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;

    svg.setAttribute('viewBox', viewbox);
  }, []);

  const path2Segment = useCallback((pathDom, step) => {
    // https://stackoverflow.com/a/41537362/15972569
    // https://dev.to/tqbit/how-to-create-svg-elements-with-javascript-4mmp
    const _pathDom = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    _pathDom.setAttribute('d', originalPathRef.current);
    const maxLength = _pathDom.getTotalLength();
    let point = _pathDom.getPointAtLength(0);
    let path = `M${point.x} ${point.y}`;
    for (let i = maxLength / step; i <= maxLength; i += maxLength / step) {
      point = _pathDom.getPointAtLength(i);
      path = path + `L${point.x} ${point.y}`;
    }
    path = path + `Z`;
    pathDom.setAttribute('d', path);
  }, []);

  useEffect(() => {
    path2Segment(pathDomRef.current, step * 100);
  }, [path2Segment, step]);

  return (
    <div
      ref={wrapperRef}
      className={css`
        width: 100%;
      `}
    >
      <svg
        ref={svgDomRef}
        className={css`
          width: 100%;
          height: auto;
          display: block;
          /* border: 1px solid; */
        `}
      >
        <g ref={stageDomRef} transform={`translate(5, 2.5) scale(0.95)`}>
          <path
            ref={pathDomRef}
            strokeWidth={1}
            stroke={d3.interpolateBlues(transform([0, 1], [0.3, 0.7])(step))}
            fill="transparent"
            d={pathData}
          ></path>
          {/* <defs>
            <linearGradient id="bebop" x1="0" x2="1" y1="0" y2="1">
              {gradientInfoList.map(({t, color}, index) => {
                return <stop key={index} offset={t} stopColor={color}></stop>;
              })}
            </linearGradient>
          </defs>
          <path
            ref={pathDomRef}
            strokeWidth={0.2}
            stroke="transparent"
            fill={`url(#bebop)`}
            d={original}
          /> */}
        </g>
      </svg>
    </div>
  );
};

export {PathTransition};
