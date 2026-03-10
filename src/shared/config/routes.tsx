import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Carousel from '~pages/Carousel';
import Onboarding from '~pages/Onboarding';

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Carousel />} />
        <Route path='/auth' element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  );
};
