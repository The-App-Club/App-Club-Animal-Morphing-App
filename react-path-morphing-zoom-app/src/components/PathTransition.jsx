import {css} from '@emotion/css';
import {useRef, useEffect, useState, useCallback} from 'react';
import {transform} from 'framer-motion';
import * as d3 from 'd3';
import {useResizeObserver} from '../hooks/useResizeObserver';
import {interpolatePath} from 'd3-interpolate-path';

const width = 300;
const height = 350;

// const data = {
//   a: `M135.97920391707962,0L137.21020258225658,2.166567749911337L136.86231165514096,6.34400761457033L135.08335292161502,6.544447743720582L133.70421388912274,5.720571584002471L134.37227915850045,0.36263032343634904Z`,
//   b: `M179.07608633219843,3.637978807091713e-12L245.28664329753587,116.53112345507907L226.57496415513629,341.21911699446355L130.89179901687794,352L56.71335670246344,307.6869548696377L92.64594934125171,19.504453064371774Z`,
// };

const data = {
  a: `M28.571935778615853,273.20763733952816L0,250.1977317026835L52.41341861375781,78.79236266047178L300.68335726406394,82.27592721863874L302.0000000000002,265.9530948905642L80.04714789191985,264.3917768278866Z`,
  b: `M157.24706336062235,351.99999999999994L156.09252423986692,351.07021223803423L158.21045362032578,344.1440380508843L168.24258301121765,344.284802456672L168.29578611087723,351.7068573468242L159.32708155030596,351.6437673693978Z`,
};

const PathTransition = ({tik}) => {
  const svgDomRef = useRef();
  const wrapperRef = useRef();
  const stageDomRef = useRef();
  const pathDomRef = useRef();
  const dimensions = useResizeObserver({ref: wrapperRef});

  const niceMorph = useCallback(({dPath1, dPath2}) => {
    d3.select(pathDomRef.current)
      .transition()
      .delay(300)
      .duration(1000)
      .attrTween('d', function (d) {
        return interpolatePath(dPath1, dPath2);
      })
      .transition()
      .delay(300)
      .duration(1000)
      .attrTween('d', function (d) {
        return interpolatePath(dPath2, dPath1);
      });
  }, []);

  const morph = useCallback(({dPath1, dPath2}) => {
    d3.select(pathDomRef.current)
      .attr('d', dPath1)
      .transition()
      .delay(300)
      .duration(1000)
      .attr('d', dPath2)
      .transition()
      .delay(300)
      .duration(1000)
      .attr('d', dPath1);
  }, []);

  useEffect(() => {
    const {a: dPath1, b: dPath2} = data;
    // morph({dPath1, dPath2});
    niceMorph({dPath1, dPath2});
  }, [tik]);

  return (
    <div ref={wrapperRef}>
      <svg
        ref={svgDomRef}
        className={css`
          width: 100%;
          display: block;
          border: 1px solid;
        `}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g ref={stageDomRef}>
          <path ref={pathDomRef} />
        </g>
      </svg>
    </div>
  );
};

export {PathTransition};
