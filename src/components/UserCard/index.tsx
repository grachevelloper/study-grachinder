import {
  Carousel as AntCarousel,
  Flex,
  Image,
  Tag,
  Typography,
  theme,
} from 'antd';

import styles from './user-card.module.css';

import type {User} from '~shared/typings/user';

const {Title, Paragraph} = Typography;

interface UserCardProps {
  user: Pick<User, 'name' | 'interests' | 'bio' | 'avatar_urls'>;
  formatInterest?: (interest: string) => string;
}

export const UserCard = ({user, formatInterest}: UserCardProps) => {
  const {
    token: {colorTextLightSolid},
  } = theme.useToken();

  return (
    <Flex justify='center' align='center' className={styles.card}>
      <div className={styles.carouselWrapper}>
        <AntCarousel
          autoplay={{dotDuration: true}}
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
          style={{color: colorTextLightSolid, marginBottom: '8px'}}
        >
          {user.name}
        </Title>
        <Flex gap='8px' wrap>
          {user.interests?.map((interest) => (
            <Tag key={interest}>
              {formatInterest ? formatInterest(interest) : interest}
            </Tag>
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
