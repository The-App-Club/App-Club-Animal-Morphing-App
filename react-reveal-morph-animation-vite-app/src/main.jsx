import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';

import {HomePage} from './pages/home';
import {AboutPage} from './pages/about';

import '@fontsource/inter';
import './styles/index.scss';

const App = () => {
  const location = useLocation();
  return (
    <main>
      <article>
        <Routes location={location}>
          <Route exact path={'/about'} element={<AboutPage />} />
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </article>
    </main>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
