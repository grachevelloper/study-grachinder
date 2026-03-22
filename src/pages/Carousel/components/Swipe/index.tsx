/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Flex,
  Typography,
  Image,
  Tag,
  Carousel as AntCarousel,
  theme,
} from 'antd';
import {useState} from 'react';

import styles from './swipe.module.css';

import type {User} from '~shared/typings/user';

const {Title, Paragraph} = Typography;

interface SwipeProps {
  user: Pick<User, 'name' | 'interests' | 'bio' | 'avatar_urls'>;
  onClick: VoidFunction;
  onLike?: (user: any) => void;
  onDislike?: (user: any) => void;
}

export const Swipe = ({user, onLike, onDislike, onClick}: SwipeProps) => {
  const {
    token: {colorTextLightSolid},
  } = theme.useToken();

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
        <Title level={3}>Нет больше анкет</Title>
      </Flex>
    );
  }

  return (
    <Flex vertical className={styles.container} onClick={onClick}>
      <Flex
        justify='center'
        align='center'
        className={`${styles.card} ${direction === 'like' ? styles.swipeTop : ''} ${direction === 'dislike' ? styles.swipeBottom : ''}`}
      >
        <div className={styles.carouselWrapper}>
          <AntCarousel
            autoplay={{dotDuration: true}}
            dotPlacement='bottom'
            autoplaySpeed={9000}
            draggable
            rootClassName={styles.slider}
            adaptiveHeight={false}
            style={{
              height: '100%',
            }}
          >
            {user.avatar_urls.map((url, index) => (
              <div key={index} className={styles.slide}>
                <Image
                  src={url}
                  width='100%'
                  height='100%'
                  preview={false}
                  className={styles.img}
                  alt='avatar'
                />
              </div>
            ))}
          </AntCarousel>
        </div>

        <Flex vertical gap='16px' className={styles.info}>
          <Title
            level={2}
            style={{color: colorTextLightSolid, marginBottom: '8px'}}
          >
            {user.name}
          </Title>
          <Flex gap='8px' wrap>
            {user.interests.map((interest) => (
              <Tag key={interest} className={styles.interestTag}>
                {interest}
              </Tag>
            ))}
          </Flex>
          <Paragraph
            style={{color: colorTextLightSolid}}
            ellipsis={{rows: 3, expandable: false}}
          >
            {user.bio}
          </Paragraph>
        </Flex>
      </Flex>

      <Flex gap='24px' justify='center' className={styles.buttons}></Flex>
    </Flex>
  );
};
