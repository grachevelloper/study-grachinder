import {lazy, Suspense} from 'react';

const UserCardDesktop = lazy(() => import('./ui/SiderUserInfo'));
const UserCardMobile = lazy(() => import('./ui/BottomSheetUserInfo'));

interface UserCardProps {
  user: any;
  isMobile: boolean;
  open?: boolean;
  onClose?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
}

const userInfo = ({user, open, onClose, isMobile, onLike, onDislike}: UserCardProps) => {
  const Component = isMobile ? UserCardMobile : UserCardDesktop;

  return (
    <Suspense fallback={undefined}>
      <Component user={user} onLike={onLike} onDislike={onDislike} {...(isMobile ? {open, onClose} : {})} />
    </Suspense>
  );
};
export default userInfo;
