import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {AuthLayout} from '~components/AuthLayout';
import Carousel from '~pages/Carousel';
import Onboarding from '~pages/Onboarding';
import Profile from '~pages/Profile';
import SignIn from '~pages/SignIn';

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />} path='/auth'>
          <Route path='signup' element={<Onboarding />} />
          <Route path='signin' element={<SignIn />} />
        </Route>
        <Route path='/' element={<Carousel />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};
