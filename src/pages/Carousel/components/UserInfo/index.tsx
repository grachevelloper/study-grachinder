import {lazy, Suspense} from 'react';

const UserCardDesktop = lazy(() => import('./ui/SiderUserInfo'));
const UserCardMobile = lazy(() => import('./ui/BottomSheetUserInfo'));

interface UserCardProps {
  user: any;
  isMobile: boolean;
  open?: boolean;
  onClose?: () => void;
}

const userInfo = ({user, open, onClose, isMobile}: UserCardProps) => {
  const Component = isMobile ? UserCardMobile : UserCardDesktop;

  return (
    <Suspense fallback={undefined}>
      <Component user={user} {...(isMobile ? {open, onClose} : {})} />
    </Suspense>
  );
};
export default userInfo;
