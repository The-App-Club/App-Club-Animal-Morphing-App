import {css} from '@emotion/css';
import {Link} from 'react-router-dom';
import {Layout} from '../../layouts/default';

const AboutPage = () => {
  return (
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
        <h2>AboutPage</h2>
        <Link to={`/`}>home</Link>
      </section>
    </Layout>
  );
};

export {AboutPage};
