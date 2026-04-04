import {
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import {Typography, Flex, Tag, Divider} from 'antd';
import {useTranslation} from 'react-i18next';

import styles from './sider-user-info.module.css';

import type {User} from '~shared/typings/user';

const {Title, Text} = Typography;

type SiderUserInfoProps = {
  user: User;
};

const SiderUserInfo = ({user}: SiderUserInfoProps) => {
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
            {t('auth.preview.city_format', {city: user.city_id})}
          </Text>
        </div>
      </Flex>

      <Flex wrap='wrap' gap={16} className={styles.infoRow}>
        <Text className={styles.infoItem}>
          <CalendarOutlined /> {t('auth.preview.age_format', {age: user.age})}
        </Text>
        <Text className={styles.infoItem}>
          <UserOutlined /> {t(`auth.main_info.gender_${user.gender}`)}
        </Text>
        {user.children_count !== undefined && (
          <Text className={styles.infoItem}>
            <HeartOutlined /> {t('auth.baptism_info.children_label')}:{' '}
            {user.children_count}
          </Text>
        )}
      </Flex>

      <Divider className={styles.divider} />

      <div className={styles.section}>
        <Title level={4} className={styles.sectionTitle}>
          {t('auth.preview.about_label')}
        </Title>
        <Text className={styles.about}>
          {user.bio || t('auth.preview.about_placeholder')}
        </Text>
      </div>

      <div className={styles.section}>
        <Title level={4} className={styles.sectionTitle}>
          {t('auth.preview.interests_label')}
        </Title>
        <Flex wrap='wrap' gap={8} className={styles.interests}>
          {user.interest_ids?.map((interest: number) => (
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
