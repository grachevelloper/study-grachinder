import {
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import {Drawer, Typography, Flex, Divider, Button} from 'antd';
import {useTranslation} from 'react-i18next';

import styles from './bottom-sheet-user-info.module.css';

import type {User} from '~shared/typings/user';

import {InterestTag} from '~components/InterestTag';

const {Title, Text} = Typography;

interface BottomSheetInfoProps {
  user: User;
  onClose?: () => void;
  open?: boolean;
}

const BottomSheet = ({open, onClose, user}: BottomSheetInfoProps) => {
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
        <Flex justify='space-between' align='start' className={styles.header}>
          <div>
            <Title level={4} className={styles.name} style={{margin: '4px 0'}}>
              {user.name}
            </Title>
            <Text className={styles.city}>
              <EnvironmentOutlined />{' '}
              {user.city ?? t('auth.preview.city_format', {city: user.city_id})}
            </Text>
          </div>
          <CloseOutlined
            type='text'
            onClick={onClose}
            className={styles.closeButton}
          />
        </Flex>

        <Flex wrap='wrap' gap={16} className={styles.infoRow}>
          <Text className={styles.infoItem}>
            <CalendarOutlined /> {t('auth.preview.age_format', {age: user.age})}
          </Text>
          <Text className={styles.infoItem}>
              <UserOutlined /> {t(`auth.main_info.gender_${user.gender}` as any)}
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
          <Title
            level={5}
            className={styles.sectionTitle}
            style={{margin: '4px 0'}}
          >
            {t('auth.preview.about_label')}
          </Title>
          <Text className={styles.about}>
            {user.bio || t('auth.preview.about_placeholder')}
          </Text>
        </div>

        <div className={styles.section}>
          <Title
            level={5}
            className={styles.sectionTitle}
            style={{margin: '4px 0'}}
          >
            {t('auth.preview.interests_label')}
          </Title>
          <Flex wrap='wrap' gap={8} className={styles.interests}>
            {user.interests?.map((name) => (
              <InterestTag key={name} name={name} className={styles.interestTag} />
            ))}
          </Flex>
        </div>

        <Button
          type='primary'
          size='large'
          variant='filled'
          color='primary'
          block
          className={styles.actionButton}
        >
          {t('common:like')}
        </Button>
      </Flex>
    </Drawer>
  );
};
export default BottomSheet;
