import {Flex, Carousel as AntCarousel} from 'antd';
import {useEffect, useRef, useState} from 'react';

import {Swipe} from './components/Swipe';
import UserInfo from './components/UserInfo';
import {BOTTOM_SHEET_TRESHOLD_PX} from './constants';
import {useScrollDirection} from './hooks/use-scroll-direction';

import styles from './carousel.module.css';

const MOCK_USERS = [
  {
    name: 'Добрыня Никитич',
    bio: 'Богатырь земли русской. Ищу спутницу жизни, с которой можно и в поход, и за стол праздничный. Люблю коней, баню и былины сказывать.',
    interests: ['interests.faith', 'interests.nature', 'interests.history'],
    avatar_urls: [
      'https://1.downloader.disk.yandex.ru/preview/41ee7b916a7bb3d6541f35f3a1ed12c49f0f2d8e7fe3bd7b167608ccd246d683/inf/YAyWoKVcOPWT20-DUm9ClpqWxqMXAo3FzDej9wnvaMyTC4qmcbyaXK1Zz-tZaqXUy0v9xR8YEnwl3CVEeu97IQ%3D%3D?uid=845898402&filename=закалялась%20сталь.webp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=845898402&tknv=v3&size=3456x1960',
      'https://3.downloader.disk.yandex.ru/preview/3f19679911fed78a252d41d1cad6677b1365bf5f377dc07f1b8616b67ad9520b/inf/jkk3Y7EBMq8COZs_yYwMI8y4uhJcZvSElP3uM015Ar3WfuCknGQOObjJbPwlaWcwLf4llqoThsUE5TmDfR6Jog%3D%3D?uid=845898402&filename=VRS00170.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=845898402&tknv=v3&size=3456x1960',
      'https://3.downloader.disk.yandex.ru/preview/29a88b8c036e4421786fe462bb0965af7ac7680167d8f7cf0c8420943e5c1637/inf/rhh5owv3u4LlJD9vtqC-iDWDvyy9Cr59MFxuxuvkFqo5AuLwtI0Xi48sgwikU3Wpyl3CUgbkN3rg46QCtI2fOg%3D%3D?uid=845898402&filename=VRS00110.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=845898402&tknv=v3&size=3456x1960',
    ],
  },
  {
    name: 'Грачичич',
    bio: 'Богатырь земли русской. Ищу спутницу жизни, с которой можно и в поход, и за стол праздничный. Люблю коней, баню и былины сказывать.',
    interests: ['interests.faith', 'interests.nature', 'interests.history'],
    avatar_urls: [
      'https://3.downloader.disk.yandex.ru/preview/29a88b8c036e4421786fe462bb0965af7ac7680167d8f7cf0c8420943e5c1637/inf/rhh5owv3u4LlJD9vtqC-iDWDvyy9Cr59MFxuxuvkFqo5AuLwtI0Xi48sgwikU3Wpyl3CUgbkN3rg46QCtI2fOg%3D%3D?uid=845898402&filename=VRS00110.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=845898402&tknv=v3&size=3456x1960',
    ],
  },
];

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

  return (
    <Flex className={styles.carousel} justify='center'>
      <AntCarousel dots={false} draggable vertical>
        {MOCK_USERS.map((user) => (
          <Swipe
            onClick={handleCardClick}
            user={user}
            key={user.avatar_urls[0]}
          />
        ))}
      </AntCarousel>
      <UserInfo
        open={isBottomSheetOpen}
        user={{}}
        onClose={handleCardClick}
        isMobile={isMobile.current}
      />
    </Flex>
  );
};
