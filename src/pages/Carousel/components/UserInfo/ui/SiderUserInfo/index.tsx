import {
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import {Typography, Flex, Tag, Divider} from 'antd';
import {useTranslation} from 'react-i18next';

import styles from './sider-user-info.module.css';

const {Title, Text} = Typography;

export const MOCK_USER = {
  name: 'Добрыня Никитич',
  age: 33,
  city: 'Муром',
  about:
    'Богатырь земли русской. Ищу спутницу жизни, с которой можно и в поход, и за стол праздничный. Люблю коней, баню и былины сказывать.',
  interests: ['interests.faith', 'interests.nature', 'interests.history'],
  baptismDate: '2020-01-19',
  childrenCount: 0,
  maritalStatus: 'single',
  gender: 'male',
};

interface UserCardProps {
  user: typeof MOCK_USER;
}

const SiderUserInfo = ({user}: UserCardProps) => {
  const {t} = useTranslation(['auth', 'common']);

  return (
    <Flex vertical className={styles.card}>
      <Flex
        justify='space-between'
        align='flex-start'
        className={styles.header}
      >
        <div>
          <Title level={2} className={styles.name}>
            {user.name}, {user.age}
          </Title>
          <Text className={styles.city}>
            <EnvironmentOutlined />{' '}
            {t('auth.preview.city_format', {city: user.city})}
          </Text>
        </div>
      </Flex>

      <Flex wrap='wrap' gap={16} className={styles.infoRow}>
        <Text className={styles.infoItem}>
          <CalendarOutlined /> {t('auth.preview.age_format', {age: user.age})}
        </Text>
        <Text className={styles.infoItem}>
          {/* @ts-expect-error - динамический ключ i18n */}
          <UserOutlined /> {t(`auth.main_info.gender_${user.gender}`)}
        </Text>
        {user.childrenCount !== undefined && (
          <Text className={styles.infoItem}>
            <HeartOutlined /> {t('auth.baptism_info.children_label')}:{' '}
            {user.childrenCount}
          </Text>
        )}
      </Flex>

      <Divider className={styles.divider} />

      <div className={styles.section}>
        <Title level={4} className={styles.sectionTitle}>
          {t('auth.preview.about_label')}
        </Title>
        <Text className={styles.about}>
          {user.about || t('auth.preview.about_placeholder')}
        </Text>
      </div>

      <div className={styles.section}>
        <Title level={4} className={styles.sectionTitle}>
          {t('auth.preview.interests_label')}
        </Title>
        <Flex wrap='wrap' gap={8} className={styles.interests}>
          {user.interests?.map((interest) => (
            <Tag key={interest} className={styles.interestTag}>
              {/* @ts-expect-error - динамический ключ i18n */}
              {t(`auth.interests.${interest}`)}
            </Tag>
          ))}
        </Flex>
      </div>
    </Flex>
  );
};
export default SiderUserInfo;
