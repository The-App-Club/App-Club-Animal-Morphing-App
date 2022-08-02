import {useEffect, useRef, useState, useCallback} from 'react';
import {css} from '@emotion/css';
import {AnimatePresence} from 'framer-motion';

import {Layout} from '../../layouts/default';
import {RevealCosme} from '../../components/RevealCosme';
import {Link} from 'react-router-dom';

const HomePage = () => {
  const revealCosmeDomRef = useRef(null);
  const [doRevealCosmeAnimate, setDoRevealCosmeAnimate] = useState(false);
  const [showUpContent, setShowUpContent] = useState(false);

  const notifierRevealCosmeAnimationEnd = useCallback(() => {
    setTimeout(() => {
      setShowUpContent(true);
    }, 300);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDoRevealCosmeAnimate(true);
    }, 1300);
    return () => {};
  }, []);

  return (
    <>
      <RevealCosme
        isAnimate={doRevealCosmeAnimate}
        ref={revealCosmeDomRef}
        notifier={notifierRevealCosmeAnimationEnd}
      />
      <AnimatePresence>
        {showUpContent && (
          <Layout>
            <section
              className={css`
                width: 100%;
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                gap: 1rem;
                h2 {
                  font-size: 4rem;
                }
              `}
            >
              <h2>Hello World</h2>
              <Link to={`/about`}>about</Link>
            </section>
          </Layout>
        )}
      </AnimatePresence>
    </>
  );
};

export {HomePage};
