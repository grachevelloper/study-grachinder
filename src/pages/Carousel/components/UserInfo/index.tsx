import {lazy, Suspense, useEffect, useState} from 'react';
import {Spin} from 'antd';

const UserCardDesktop = lazy(() => import('./ui/SiderUserInfo'));
const UserCardMobile = lazy(() => import('./ui/BottomSheetUserInfo'));

interface UserCardProps {
  user: any;
  isMobile: boolean;
  open?: boolean;
  onClose?: () => void;
}

export default ({user, open, onClose, isMobile}: UserCardProps) => {
  const Component = isMobile ? UserCardMobile : UserCardDesktop;

  return (
    <Suspense fallback={<Spin size='large' className='loader' />}>
      <Component user={user} {...(isMobile ? {open, onClose} : {})} />
    </Suspense>
  );
};
