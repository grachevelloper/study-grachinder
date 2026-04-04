import {Flex, Carousel as AntCarousel, theme, Spin} from 'antd';
import {useEffect, useRef, useState} from 'react';


import {useGetFeed} from './api';
import {Swipe} from './components/Swipe';
import UserInfo from './components/UserInfo';
import {BOTTOM_SHEET_TRESHOLD_PX} from './constants';
import {useScrollDirection} from './hooks/use-scroll-direction';

import styles from './carousel.module.css';

import type {User} from '~shared/typings/user';

import {ErrorBoundary} from '~components/ErrorBoundary';

const CarouselPage = () => {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
  const carouselRef = useRef<any>(null);

  const {data: users = [], isLoading} = useGetFeed();

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
      <AntCarousel
        ref={carouselRef}
        dots={false}
        draggable
        vertical
        className={styles.cards}
        style={{
          aspectRatio: isMobile ? undefined : '9 / 19.5',
        }}
        afterChange={handleSlideChange}
      >
        {users.map((user, index) => (
          <Swipe
            onClick={handleCardClick}
            user={user as User}
            key={user.id ?? index}
            isActive={index === currentUserIndex}
          />
        ))}
      </AntCarousel>

      <UserInfo
        open={isBottomSheetOpen}
        user={currentUser}
        onClose={handleCardClick}
        isMobile={isMobile}
      />
    </Flex>
  );
};

const CarouselPageWithBoundary = () => (
  <ErrorBoundary scope='feed'>
    <CarouselPage />
  </ErrorBoundary>
);

export default CarouselPageWithBoundary;
