import {lazy, Suspense} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {AuthLayout} from '~components/AuthLayout';
import {BaseLayout} from '~components/BaseLayout';

const Carousel = lazy(() => import('~pages/Carousel'));
const Onboarding = lazy(() => import('~pages/Onboarding'));
const Profile = lazy(() => import('~pages/Profile'));
const SignIn = lazy(() => import('~pages/SignIn'));
const NotFound = lazy(() => import('~pages/NotFound'));

const AppRoutes = () => {
  return (
    <BrowserRouter basename='/study-grachinder'>
      <Suspense>
        <Routes>
          <Route element={<AuthLayout />} path='/auth'>
            <Route path='signup' element={<Onboarding />} />
            <Route path='signin' element={<SignIn />} />
          </Route>
          <Route element={<BaseLayout />} path='/'>
            <Route path='/' element={<Carousel />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
export default AppRoutes;
