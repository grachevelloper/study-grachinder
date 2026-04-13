import {Flex, Typography} from 'antd';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import styles from './swipe.module.css';

import type {User} from '~shared/typings/user';

import {UserCard} from '~components/UserCard';

const {Title} = Typography;

interface SwipeProps {
  user: User;
  onClick: VoidFunction;
  isActive?: boolean;
  swipeDirection?: 'like' | 'dislike' | null;
}

export const Swipe = ({
  user,
  onClick,
  isActive = false,
  swipeDirection = null,
}: SwipeProps) => {
  const {t} = useTranslation('carousel');

  if (!user) {
    return (
      <Flex vertical align='center' justify='center' className={styles.empty}>
        <Title level={3}>{t('no_more_profiles')}</Title>
      </Flex>
    );
  }

  return (
    <Flex vertical className={styles.container} onClick={onClick}>
      <div
        className={`${styles.animWrapper} ${swipeDirection === 'like' ? styles.swipeBottom : ''} ${swipeDirection === 'dislike' ? styles.swipeTop : ''}`}
      >
        <UserCard user={user} isActive={isActive} />
      </div>
    </Flex>
  );
};
