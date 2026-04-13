import {MailOutlined, PhoneOutlined, SendOutlined} from '@ant-design/icons';
import {Flex, Carousel as AntCarousel, theme, Spin, Modal, Button, Typography, Divider} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {useGetFeed, useLikeUser, usePassUser} from './api';
import {Swipe} from './components/Swipe';
import UserInfo from './components/UserInfo';
import {BOTTOM_SHEET_TRESHOLD_PX} from './constants';
import {useScrollDirection} from './hooks/use-scroll-direction';

import styles from './carousel.module.css';

import type {User} from '~shared/typings/user';

import {ErrorBoundary} from '~components/ErrorBoundary';

const {Text} = Typography;

const CarouselPage = () => {
  const {t} = useTranslation('common');
  const [isBottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
  const [likedUser, setLikedUser] = useState<User | null>(null);
  const [currentSwipeDirection, setCurrentSwipeDirection] = useState<'like' | 'dislike' | null>(null);
  const carouselRef = useRef<any>(null);
  const isProgrammatic = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const {data: users = [], isLoading} = useGetFeed();
  const {mutate: likeUser} = useLikeUser();
  const {mutate: passUser} = usePassUser();

  const {scrollDirection, scrollY} = useScrollDirection({
    threshold: BOTTOM_SHEET_TRESHOLD_PX,
  });

  const {
    token: {colorBgBase},
  } = theme.useToken();

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (
      scrollDirection === 'down' &&
      scrollY > BOTTOM_SHEET_TRESHOLD_PX &&
      isMobile
    ) {
      setBottomSheetOpen(true);
    }
  }, [scrollDirection, scrollY]);

  const handleCardClick = () => {
    setBottomSheetOpen((prev) => !prev);
  };

  const handleSlideChange = (currentSlide: number) => {
    setCurrentUserIndex(currentSlide);
  };

  const currentUser = users[currentUserIndex] as User;

  const handleBeforeChange = (current: number, next: number) => {
    if (isProgrammatic.current) {
      isProgrammatic.current = false;
      return;
    }
    const user = users[current] as User;
    if (!user) return;
    if (next > current) {
      setLikedUser(user);
      likeUser(user.id);
    } else if (current > 0 && next === current - 1) {
      passUser(user.id);
    }
  };

  const handleLike = () => {
    if (!currentUser) return;
    setLikedUser(currentUser);
    setCurrentSwipeDirection('like');
    isProgrammatic.current = true;
    likeUser(currentUser.id);
    setTimeout(() => {
      carouselRef.current?.next();
      setCurrentSwipeDirection(null);
    }, 300);
  };

  const handleDislike = () => {
    if (!currentUser) return;
    setCurrentSwipeDirection('dislike');
    isProgrammatic.current = true;
    passUser(currentUser.id);
    setTimeout(() => {
      carouselRef.current?.next();
      setCurrentSwipeDirection(null);
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    touchStartY.current = null;
    if (Math.abs(delta) < 60) return;
    if (delta > 0) {
      handleLike();
    } else {
      handleDislike();
    }
  };

  if (isLoading) {
    return (
      <Flex
        className={styles.carousel}
        justify='center'
        align='center'
        style={{backgroundColor: colorBgBase}}
      >
        <Spin size='large' />
      </Flex>
    );
  }

  return (
    <Flex
      className={styles.carousel}
      justify='center'
      align='center'
      style={{backgroundColor: colorBgBase}}
      gap='0'
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{height: '100%', aspectRatio: isMobile ? undefined : '9 / 19.5'}}
      >
        <AntCarousel
          ref={carouselRef}
          dots={false}
          draggable
          swipe={false}
          vertical
          className={styles.cards}
          afterChange={handleSlideChange}
          beforeChange={handleBeforeChange}
        >
          {users.map((user, index) => (
            <Swipe
              onClick={handleCardClick}
              user={user as User}
              key={user.id ?? index}
              isActive={index === currentUserIndex}
              swipeDirection={index === currentUserIndex ? currentSwipeDirection : null}
            />
          ))}
        </AntCarousel>
      </div>

      <UserInfo
        open={isBottomSheetOpen}
        user={currentUser}
        onClose={handleCardClick}
        isMobile={isMobile}
        onLike={handleLike}
        onDislike={handleDislike}
      />

      <Modal
        open={!!likedUser}
        onCancel={() => setLikedUser(null)}
        footer={[
          <Button key='ok' color='primary' variant='filled' onClick={() => setLikedUser(null)}>
            {t('like.close')}
          </Button>,
        ]}
        title={t('like.contacts_title', {name: likedUser?.name})}
      >
        <Flex vertical gap={12} style={{paddingTop: 8}}>
          {likedUser?.telegram && (
            <Text><SendOutlined style={{marginRight: 8}} />{likedUser.telegram}</Text>
          )}
          {likedUser?.phone && (
            <Text><PhoneOutlined style={{marginRight: 8}} />{likedUser.phone}</Text>
          )}
          {likedUser?.email && (
            <Text><MailOutlined style={{marginRight: 8}} />{likedUser.email}</Text>
          )}
          {!likedUser?.telegram && !likedUser?.phone && !likedUser?.email && (
            <Text type='secondary'>{t('like.no_contacts', {name: likedUser?.name})}</Text>
          )}
          <Divider style={{margin: '4px 0'}} />
          <Text type='secondary'>{t('like.waiting_message', {name: likedUser?.name})}</Text>
        </Flex>
      </Modal>
    </Flex>
  );
};

const CarouselPageWithBoundary = () => (
  <ErrorBoundary scope='feed'>
    <CarouselPage />
  </ErrorBoundary>
);

export default CarouselPageWithBoundary;
