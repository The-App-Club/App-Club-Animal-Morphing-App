import {css} from '@emotion/css';

const Metaball = () => {
  return (
    <svg
      className={css`
        visibility: hidden;
        width: 0;
        height: 0;
      `}
    >
      <defs>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey"></feColorMatrix>
          <feComposite in="SourceGraphic" in2="gooey" operator="atop"></feComposite>
        </filter>
      </defs>
    </svg>
  );
};

export {Metaball};
