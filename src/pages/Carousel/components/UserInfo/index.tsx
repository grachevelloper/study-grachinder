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
  const MOCK_USER = {
    name: 'Добрыня Никитич',
    age: 33,
    city: 'Муром',
    about:
      'Богатырь земли русской. Ищу спутницу жизни, с которой можно и в поход, и за стол праздничный. Люблю коней, баню и былины сказывать.',
    interests: ['interests.faith', 'interests.nature', 'interests.history'],
    baptismDate: '2020-01-19',
    childrenCount: 0,
    maritalStatus: 'single',
    gender: 'male',
    contacts: {
      telegram: '@dobrynya',
      phone: '+7 (999) 123-45-67',
      email: 'dobrynya@mail.ru',
    },
  };

  return (
    <Suspense fallback={<Spin size='large' className={styles.loader} />}>
      <Component user={MOCK_USER} {...(isMobile ? {open, onClose} : {})} />
    </Suspense>
  );
};
