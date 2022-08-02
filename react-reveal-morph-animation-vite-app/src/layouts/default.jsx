import {css} from '@emotion/css';
import {motion} from 'framer-motion';

const variants = {
  hidden: {opacity: 0, x: 0, y: 60},
  enter: {opacity: 1, x: 0, y: 0},
  exit: {opacity: 0, x: 0, y: 60},
};

const Layout = ({children}) => (
  <motion.div
    initial="hidden"
    animate="enter"
    exit="exit"
    variants={variants}
    transition={{duration: 0.4, type: 'easeInOut'}}
    className={css`
      position: relative;
      width: 100%;
    `}
  >
    {children}
  </motion.div>
);

export {Layout};
