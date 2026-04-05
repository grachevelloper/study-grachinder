import {
  Carousel as AntCarousel,
  Flex,
  Image,
  Typography,
  theme,
} from 'antd';
import {useRef} from 'react';

import styles from './user-card.module.css';

import type {User} from '~shared/typings/user';

import {InterestTag} from '~components/InterestTag';

const {Title, Paragraph} = Typography;

interface UserCardProps {
  user: User;
  isActive?: boolean;
}

export const UserCard = ({user, isActive = false}: UserCardProps) => {
  const {
    token: {colorTextLightSolid},
  } = theme.useToken();

  const carouselRef = useRef<any>(null);

  return (
    <Flex justify='center' align='center' className={styles.card}>
      <div className={styles.carouselWrapper}>
        <AntCarousel
          ref={carouselRef}
          autoplay={isActive ? {dotDuration: true} : false}
          dotPlacement='bottom'
          autoplaySpeed={9000}
          draggable
          rootClassName={styles.slider}
          adaptiveHeight={false}
          style={{height: '100%'}}
        >
          {user.avatar_urls?.map((url, index) => (
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
          style={{
            color: colorTextLightSolid,
            marginBottom: '8px',
            textWrap: 'auto',
            maxWidth: '100%',
          }}
        >
          {user.name}
        </Title>
        <Flex gap='8px' wrap>
          {user.interests?.map((name) => (
            <InterestTag key={name} name={name} />
          ))}
        </Flex>
        {user.bio && (
          <Paragraph
            style={{color: colorTextLightSolid, width: '90%'}}
            ellipsis={{rows: 3, expandable: false}}
          >
            {user.bio}
          </Paragraph>
        )}
      </Flex>
    </Flex>
  );
};
