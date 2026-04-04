import {UserOutlined} from '@ant-design/icons';
import {Flex, Carousel as AntCarousel, FloatButton, theme} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Swipe} from './components/Swipe';
import UserInfo from './components/UserInfo';
import {BOTTOM_SHEET_TRESHOLD_PX} from './constants';
import {useScrollDirection} from './hooks/use-scroll-direction';

import styles from './carousel.module.css';

import type {User} from '~shared/typings/user';
const MOCK_USERS: Partial<User>[] = [
  {
    name: 'Добрыня Никитич',
    bio: 'Жили были на Алтае бык, коза да баба з',
    interest_ids: [1, 2, 3, 4],
    avatar_urls: [
      'https://1.downloader.disk.yandex.ru/preview/41ee7b916a7bb3d6541f35f3a1ed12c49f0f2d8e7fe3bd7b167608ccd246d683/inf/YAyWoKVcOPWT20-DUm9ClpqWxqMXAo3FzDej9wnvaMyTC4qmcbyaXK1Zz-tZaqXUy0v9xR8YEnwl3CVEeu97IQ%3D%3D?uid=845898402&filename=закалялась%20сталь.webp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=845898402&tknv=v3&size=3456x1960',
      'https://3.downloader.disk.yandex.ru/preview/3f19679911fed78a252d41d1cad6677b1365bf5f377dc07f1b8616b67ad9520b/inf/jkk3Y7EBMq8COZs_yYwMI8y4uhJcZvSElP3uM015Ar3WfuCknGQOObjJbPwlaWcwLf4llqoThsUE5TmDfR6Jog%3D%3D?uid=845898402&filename=VRS00170.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=845898402&tknv=v3&size=3456x1960',
    ],
    gender: 'female',
    age: 100,
    children_count: 1,
    city_id: 1,
  },
  {
    name: 'Барабанщик',
    bio: 'Я люблю Краснодар больше, чем ты любишь свою маму',
    interest_ids: [1, 5, 6],
    avatar_urls: [
      'https://1.downloader.disk.yandex.ru/preview/3a582717eaad515c612a9927db3f2a9b851cc3b68417567f93e38882f0209818/inf/FhstAFa59bNXt703LUAN29aYqAy478ZEuH1yE_p7PbSst-mYHkA-M2Y37mT7TUzkAwRgDIr6o28gPdTG7eM7OA%3D%3D?uid=845898402&filename=барабан.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=845898402&tknv=v3&size=3456x1960',
    ],
    gender: 'male',
    age: 20,
    children_count: 1,
    city_id: 2,
  },
  {
    name: 'Грачичич',
    bio: 'Богатырь земли русской. Ищу спутницу жизни, с которой можно и в поход, и за стол праздничный. Люблю коней, баню и былины сказывать.',
    interest_ids: [1, 2, 3, 4],
    avatar_urls: [
      'https://3.downloader.disk.yandex.ru/preview/29a88b8c036e4421786fe462bb0965af7ac7680167d8f7cf0c8420943e5c1637/inf/rhh5owv3u4LlJD9vtqC-iDWDvyy9Cr59MFxuxuvkFqo5AuLwtI0Xi48sgwikU3Wpyl3CUgbkN3rg46QCtI2fOg%3D%3D?uid=845898402&filename=VRS00110.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=845898402&tknv=v3&size=3456x1960',
    ],
    gender: 'male',
    age: 20,
    children_count: 0,
    city_id: 1,
  },
  {
    name: 'Денис',
    bio: 'Люблю активный отдых и горы. Ищу попутчицу для путешествий по Алтаю.',
    interest_ids: [1, 5, 6],
    avatar_urls: [
      'https://4.downloader.disk.yandex.ru/preview/b68a5794dff9b7f4f0da88a0e366a112c518028c564c3589f47277b3a017fdcc/inf/g-kspbBdkaUM0iKfMUoNAoaZjEK45U6qMCaSBJJOtPfegXkRyNRc2RrbRT8L0Hk__trrNwOKoI_u4YjkwMK1-g%3D%3D?uid=845898402&filename=Денис.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=845898402&tknv=v3&size=3456x1960',
    ],
    gender: 'male',
    age: 28,
    children_count: 0,
    city_id: 2,
  },
  {
    name: 'Артем',
    bio: 'Программист, в свободное время играю на гитаре. Ищу серьезные отношения.',
    interest_ids: [2, 4, 7],
    avatar_urls: [
      'https://4.downloader.disk.yandex.ru/preview/988e04a2824cccd82876cd24c3576b1c609c911b4de94e1803a1019567f97bc8/inf/SwIz4ie4SMWplX3qA4tpNUE1cVNCwClTbtD6U9KELmViN1QgwvTY6yUZrASJCrElIDyXLNzRrB5HwLjC31dKAQ%3D%3D?uid=845898402&filename=артем.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=845898402&tknv=v3&size=3456x1960',
    ],
    gender: 'male',
    age: 25,
    children_count: 0,
    city_id: 1,
  },
  {
    name: 'Алексиндр',
    bio: 'Обожаю готовить и принимать гостей. Мечтаю о большой семье.',
    interest_ids: [1, 3, 8],
    avatar_urls: [
      'https://3.downloader.disk.yandex.ru/preview/2a40f996f60245f885c534c19f1bef92d148c99a0a1b11940f30d7a05bb2e6f3/inf/bc5Brl31clbG0jcowjZofEE1cVNCwClTbtD6U9KELmUNmsILiCYWryvmCW-oUxUiVXWrmJHEKFT84g5T_CEBwA%3D%3D?uid=845898402&filename=болгарчик.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=845898402&tknv=v3&size=3456x1960',
    ],
    gender: 'male',
    age: 32,
    children_count: 0,
    city_id: 2,
  },
  {
    name: 'Екатерина',
    bio: 'Люблю литературу и искусство. Ищу вдохновения и родственную душу.',
    interest_ids: [4, 7, 9],
    avatar_urls: [
      'https://3.downloader.disk.yandex.ru/preview/f2334bb890c85e9ba2e4c7d9b48327de01015d6e94246ef75fedeeacd244b5b0/inf/dmk6BYGvz7JFdNQzcyOGkaXI5GnmTf9FfrfRtOIRg5qk47JJSliK9DijwNrdG19jYagChhM9MOlm1Y3QIfv45Q%3D%3D?uid=845898402&filename=катя.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=845898402&tknv=v3&size=3456x1960',
    ],
    gender: 'female',
    age: 24,
    children_count: 0,
    city_id: 1,
  },
  {
    name: 'Никита',
    bio: 'Спорт, саморазвитие, путешествия. Буду рад познакомиться с активной девушкой.',
    interest_ids: [1, 5, 6],
    avatar_urls: [
      'https://4.downloader.disk.yandex.ru/preview/45d625ea4b427d03f3a6fb8f75689bc58235e136f67126a7ce865236f95da2b7/inf/Uhva0zy11adnkCZDVTHs9QhouTVo14UJDueAMoleyETiij7NYv0BXKc30KVTFhub3AV_JmUCVRKEbnrsVmDKXA%3D%3D?uid=845898402&filename=arnorckih.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=845898402&tknv=v3&size=3456x1960',
    ],
    gender: 'male',
    age: 29,
    children_count: 0,
    city_id: 2,
  },
];
const CarouselPage = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
  const carouselRef = useRef<any>(null);

  const {scrollDirection, scrollY} = useScrollDirection({
    threshold: BOTTOM_SHEET_TRESHOLD_PX,
  });

  const {
    token: {colorPrimary, colorBgBase},
  } = theme.useToken();

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (
      scrollDirection === 'down' &&
      scrollY > BOTTOM_SHEET_TRESHOLD_PX &&
      isMobile
    ) {
      setBottomSheetOpen(true);
      console.log('🟢 ОТКРЫВАЕМ BOTTOM SHEET');
    }
  }, [scrollDirection, scrollY]);

  const handleCardClick = () => {
    setBottomSheetOpen((prev) => !prev);
  };

  const handleSlideChange = (currentSlide: number) => {
    setCurrentUserIndex(currentSlide);
  };

  const currentUser = MOCK_USERS[currentUserIndex] as User;

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
        {MOCK_USERS.map((user, index) => (
          <Swipe
            onClick={handleCardClick}
            user={user as User}
            key={index}
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

      <FloatButton
        icon={<UserOutlined style={{color: colorPrimary}} size={32} />}
        type='primary'
        style={{
          insetInlineEnd: 24,
          right: 10,
          top: 10,
          bottom: '100%',
          height: 32,
          width: 32,
        }}
        onClick={() => navigate('/profile')}
      />
    </Flex>
  );
};

export default CarouselPage;
