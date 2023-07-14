import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppHeader } from '../appHeader';
import { Spinner } from '../spinner/Spinner';

const MainPage = lazy(() => import('../pages/mainPage/MainPage'));
const ComicsPage = lazy(() => import('../pages/comicsPage/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/singlePage/SingleComicPage'));
const SingleCharPage = lazy(() => import('../pages/singlePage/SingleCharPage'));
const Page404 = lazy(() => import('../pages/page404/Page404'));

export const App = () => (
  <BrowserRouter>
    <div className='app'>
      <AppHeader />
      <main>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/:charName' element={<SingleCharPage />} />
            <Route path='/comics' element={<ComicsPage />} />
            <Route path='/comics/:comicId' element={<SingleComicPage />} />
            <Route path='*' element={<Page404 />} /> 
          </Routes>
        </Suspense>
      </main>
    </div>
  </BrowserRouter>
);

