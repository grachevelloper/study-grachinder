import {Flex} from 'antd';
import {Dnd} from './components/Dnd';
import styles from './carousel.module.css';
import {useEffect, useRef, useState} from 'react';
import UserInfo from './components/UserInfo';
import {useScrollDirection} from './hooks/use-scroll-direction';
import {BOTTOM_SHEET_TRESHOLD_PX} from './constants';

export default () => {
  const [isBottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
  const {scrollDirection, scrollY} = useScrollDirection({
    threshold: BOTTOM_SHEET_TRESHOLD_PX,
  });
  const isMobile = useRef(window.innerWidth <= 768);

  useEffect(() => {
    if (
      scrollDirection === 'down' &&
      scrollY > BOTTOM_SHEET_TRESHOLD_PX &&
      isMobile.current
    ) {
      setBottomSheetOpen(true);
      console.log('🟢 ОТКРЫВАЕМ BOTTOM SHEET');
    }
  }, [scrollDirection, scrollY]);
  const handleCardClick = () => {
    setBottomSheetOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleWindowScroll = () => {
      console.log('🔵 WINDOW SCROLL', window.scrollY);
    };
    console.log('🔵 1111', window.scrollY);
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  return (
    <Flex className={styles.carousel} justify='center'>
      <Dnd onClick={handleCardClick} />
      <UserInfo
        open={isBottomSheetOpen}
        user={{}}
        onClose={handleCardClick}
        isMobile={isMobile.current}
      />
    </Flex>
  );
};
