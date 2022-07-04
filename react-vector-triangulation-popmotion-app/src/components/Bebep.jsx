import {cx, css} from '@emotion/css';
import {useRef, useEffect, useState, useMemo} from 'react';
import {
  animate,
  progress,
  reverseEasing,
  linear,
  clamp,
  pointFromVector,
  steps,
  snap,
} from 'popmotion';
import {samples} from 'culori';

import {useTransition, animated} from 'react-spring';

const Bebep = ({
  tik,
  startPoint = {x: 0, y: 0},
  angle,
  biscketAngle,
  distance = 50,
  count = 5,
  color,
}) => {
  const bebopDomRef = useRef(null);
  const [_angle, set_angle] = useState(angle);
  const pointInfoList = useMemo(() => {
    const result = samples(count).reduce(
      (acc, cur, index) => {
        acc.id = acc.id + 1;
        // https://github.com/Popmotion/popmotion/blob/master/packages/popmotion/src/utils/point-from-vector.ts
        const nowPoint = pointFromVector(acc.prev, _angle, distance);
        acc.list.push({id: acc.id, xy: nowPoint});
        acc.prev = nowPoint;
        return acc;
      },
      {id: 1, prev: startPoint, list: [{id: 1, xy: startPoint}]}
    );
    return result.list;
  }, [tik]);

  useEffect(() => {
    // https://github.com/Popmotion/popmotion/blob/master/packages/popmotion/src/utils/snap.ts#L1-L25
    // d3 tikに応用できそう
    const snapTo = snap(biscketAngle);
    // console.log(Math.random() * 360, Math.ceil(Math.random() * 360))
    set_angle(snapTo(Math.random() * 360));
  }, [tik]);

  const transitions = useTransition(pointInfoList, {
    key: (item) => {
      return item.id;
    },
    from: ({xy: {x, y}}) => {
      return {
        x,
        y,
        opacity: 0,
      };
    },
    enter: ({xy: {x, y}}) => {
      return {
        x,
        y,
        opacity: 1,
      };
    },
    update: ({xy: {x, y}}) => {
      return {
        x,
        y,
      };
    },
    leave: {height: 0, opacity: 0},
    config: {mass: 1, tension: 50, friction: 1, frequency: 1, duration: 500},
    trail: 25,
  });

  return (
    <>
      {transitions((style, item) => {
        return (
          <animated.div
            key={item.id}
            style={style}
            className={cx(
              css`
                position: absolute;
                background: ${color};
                width: 10px;
                height: 10px;
              `,
              ``
            )}
          ></animated.div>
        );
      })}
      {/* {pointInfoList.map((pointInfo, index) => {
        const {
          xy: {x, y},
        } = pointInfo;
        return (
          <div
            key={index}
            className={css`
              font-size: 1rem;
              position: absolute;
              width: 10px;
              height: 10px;
              background: ${color};
              top: ${y}px;
              left: ${x}px;
            `}
          />
        );
      })} */}
    </>
  );
};

export {Bebep};
