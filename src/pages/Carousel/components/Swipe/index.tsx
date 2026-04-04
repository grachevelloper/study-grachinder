import {Button, Flex, Typography} from 'antd';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import styles from './swipe.module.css';

import type {User} from '~shared/typings/user';

import {UserCard} from '~components/UserCard';

const {Title} = Typography;

interface SwipeProps {
  user: User;
  onClick: VoidFunction;
  onLike?: (user: any) => void;
  onDislike?: (user: any) => void;
  isActive?: boolean;
}

export const Swipe = ({
  user,
  onLike,
  onDislike,
  onClick,
  isActive = false,
}: SwipeProps) => {
  const {t} = useTranslation('carousel');
  const [direction, setDirection] = useState<'like' | 'dislike' | null>(null);

  const handleLike = () => {
    setDirection('like');
    setTimeout(() => {
      onLike?.(user);
      setDirection(null);
    }, 300);
  };

  const handleDislike = () => {
    setDirection('dislike');
    setTimeout(() => {
      onDislike?.(user);
      setDirection(null);
    }, 300);
  };

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
        className={`${styles.animWrapper} ${direction === 'like' ? styles.swipeTop : ''} ${direction === 'dislike' ? styles.swipeBottom : ''}`}
      >
        <UserCard user={user} isActive={isActive} />
      </div>
    </Flex>
  );
};
