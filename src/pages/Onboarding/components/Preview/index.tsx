import {EyeOutlined} from '@ant-design/icons';
import {
  Flex,
  Typography,
  Image,
  Tag,
  Carousel as AntCarousel,
  theme,
  Empty,
} from 'antd';

import {useUserStorage} from '../../hooks/useUserStorage';

import styles from './preview.module.css';

const {Title, Paragraph} = Typography;

export const Preview = () => {
  const {user} = useUserStorage();
  const {
    token: {colorTextLightSolid},
  } = theme.useToken();

  const formatInterests = (interests: string[]) => {
    if (!interests || interests.length === 0) return [];
    return interests.map((interest) =>
      interest.replace('interests.', '').replace(/_/g, ' ')
    );
  };

  const hasBasicInfo = user?.name || user?.bio || user?.interests?.length > 0;

  if (!hasBasicInfo) {
    return (
      <Flex vertical align='center' justify='center' className={styles.empty}>
        <Empty
          description='Заполните информацию о себе, чтобы увидеть превью'
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Flex>
    );
  }

  return (
    <Flex vertical className={styles.container}>
      <div className={styles.header}>
        <Title level={4} className={styles.headerTitle}>
          Предпросмотр анкеты
        </Title>
        <EyeOutlined className={styles.eyeIcon} />
      </div>

      <Flex vertical className={styles.card}>
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
            {user.name || 'Имя не указано'}
          </Title>

          <Flex gap='8px' wrap className={styles.details}>
            {user.birth_date && (
              <Tag className={styles.detailTag}>{user.birth_date}</Tag>
            )}
            {user.city_id && (
              <Tag className={styles.detailTag}>{user.city_id}</Tag>
            )}
            {user.gender && (
              <Tag className={styles.detailTag}>
                {user.gender === 'male' && 'Мужчина'}
                {user.gender === 'female' && 'Женщина'}
                {user.gender === 'other' && 'Другое'}
              </Tag>
            )}
          </Flex>

          {user.interests && user.interests.length > 0 && (
            <Flex gap='8px' wrap>
              {formatInterests(user.interests).map((interest) => (
                <Tag key={interest} className={styles.interestTag}>
                  {interest}
                </Tag>
              ))}
            </Flex>
          )}

          {user.bio && (
            <Paragraph
              style={{color: colorTextLightSolid}}
              ellipsis={{rows: 3, expandable: false}}
            >
              {user.bio}
            </Paragraph>
          )}

          {(user.telegram || user.email || user.phone) && (
            <Flex vertical gap='8px' className={styles.contacts}>
              <Typography.Text strong style={{color: colorTextLightSolid}}>
                Контакты:
              </Typography.Text>
              {user.telegram && (
                <Typography.Text style={{color: colorTextLightSolid}}>
                  Telegram: {user.telegram}
                </Typography.Text>
              )}
              {user.email && (
                <Typography.Text style={{color: colorTextLightSolid}}>
                  Email: {user.email}
                </Typography.Text>
              )}
              {user.phone && (
                <Typography.Text style={{color: colorTextLightSolid}}>
                  Телефон: {user.phone}
                </Typography.Text>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
