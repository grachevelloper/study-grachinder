import {lazy, Suspense} from 'react';
import {Spin} from 'antd';

import styles from './user-info.module.css';

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
    <Suspense fallback={undefined}>
      <Component user={user} {...(isMobile ? {open, onClose} : {})} />
    </Suspense>
  );
};
