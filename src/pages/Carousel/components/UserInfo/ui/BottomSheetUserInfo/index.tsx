import {Drawer, Typography, Flex, Tag, Divider, Button} from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import {useTranslation} from 'react-i18next';

import styles from './bottom-sheet-user-info.module.css';
import {useScrollDirection} from '../../../../hooks/use-scroll-direction';
import {useEffect, useState} from 'react';

const {Title, Text} = Typography;

// Мок-данные для примера
interface BottomSheetInfoProps {
  user: typeof MOCK_USER;
  onClose?: () => void;
  open?: boolean;
}

export default ({open, onClose, user}: BottomSheetInfoProps) => {
  const {t} = useTranslation(['auth', 'common']);
  return (
    <Drawer
      title={null}
      placement='bottom'
      open={open}
      onClose={onClose}
      size='auto'
      className={styles.bottomSheet}
      closeIcon={null}
    >
      <Flex vertical className={styles.container}>
        <Flex justify='space-between' align='center' className={styles.header}>
          <div>
            <Title level={3} className={styles.name}>
              {user.name}, {user.age}
            </Title>
            <Text className={styles.city}>
              <EnvironmentOutlined />{' '}
              {t('auth.preview.city_format', {city: user.city})}
            </Text>
          </div>
          <Button type='text' onClick={onClose} className={styles.closeButton}>
            ✕
          </Button>
        </Flex>

        <Flex wrap='wrap' gap={16} className={styles.infoRow}>
          <Text className={styles.infoItem}>
            <CalendarOutlined /> {t('auth.preview.age_format', {age: user.age})}
          </Text>
          <Text className={styles.infoItem}>
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
          <Title level={5} className={styles.sectionTitle}>
            {t('auth.preview.about_label')}
          </Title>
          <Text className={styles.about}>
            {user.about || t('auth.preview.about_placeholder')}
          </Text>
        </div>

        <div className={styles.section}>
          <Title level={5} className={styles.sectionTitle}>
            {t('auth.preview.interests_label')}
          </Title>
          <Flex wrap='wrap' gap={8} className={styles.interests}>
            {user.interests?.map((interest) => (
              <Tag key={interest} className={styles.interestTag}>
                {t(`auth.interests.${interest}`)}
              </Tag>
            ))}
          </Flex>
        </div>

        <Button
          type='primary'
          size='large'
          block
          className={styles.actionButton}
        >
          {t('common:write')}
        </Button>
      </Flex>
    </Drawer>
  );
};
