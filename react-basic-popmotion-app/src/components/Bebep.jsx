import {css} from '@emotion/css';
import {useRef, useEffect, useState} from 'react';
import {animate, progress, reverseEasing, linear, clamp} from 'popmotion';
import {transform} from 'framer-motion';

const Bebep = ({tik}) => {
  const bebopDomRef = useRef(null);
  const [isFoward, setIsForward] = useState(false);
  useEffect(() => {
    setIsForward((isFoward) => {
      return !isFoward;
    });
  }, [tik]);
  useEffect(() => {
    const bebopDom = bebopDomRef.current;
    const from = 150;
    const to = 0;
    animate({
      from: isFoward ? from : to,
      to: isFoward ? to : from,
      ease: isFoward ? linear : reverseEasing(linear),
      duration: 300, // milliseconds
      onUpdate: (latest) => {
        const nowProgress = clamp(0, 1, progress(from, to, latest));
        const fontSize = transform([0, 1], [1, 3])(nowProgress);
        // console.log(nowProgress, latest, fontSize);
        bebopDom.style.transform = `translate(0,${latest}px)`;
        bebopDom.style.fontSize = `${fontSize}rem`;
      },
    });
  }, [tik]);
  return (
    <div
      className={css`
        width: 100%;
        height: 100px;
        overflow: hidden;
      `}
    >
      <div
        ref={bebopDomRef}
        className={css`
          font-size: 1rem;
        `}
      >
        {'Cowboy'}
      </div>
    </div>
  );
};

export {Bebep};
