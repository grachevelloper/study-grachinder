import {ArrowLeftOutlined} from '@ant-design/icons';
import {Button, Divider, Flex, Skeleton, Tag, theme, Typography} from 'antd';
import classNames from 'classnames';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import styles from './profile.module.css';

import {useGetMe} from '~shared/api';
import {useAuth} from '~shared/providers/Auth';
import animStyles from '~shared/styles/animations.module.css';

const {Title, Text, Paragraph} = Typography;

const ProfileField = ({
  label,
  value,
  delay,
  empty,
}: {
  label: string;
  value?: string | number | null;
  delay: string;
  empty: string;
}) => (
  <div className={classNames(animStyles.fadeItem, delay, styles.field)}>
    <Text type='secondary'>{label}</Text>
    <Text className={styles.fieldValue}>
      {value ?? <span className={styles.empty}>{empty}</span>}
    </Text>
  </div>
);

const ProfilePage = () => {
  const {t} = useTranslation(['auth', 'common']);
  const navigate = useNavigate();
  const {user: authUser} = useAuth();
  const {data: me, isLoading} = useGetMe();
  const {
    token: {colorBgBase},
  } = theme.useToken();

  const user = me ?? authUser;
  const notSpecified = t('auth.profile.not_specified');

  if (isLoading) {
    return (
      <Flex className={styles.page} justify='center'>
        <Flex vertical className={styles.content} gap='24px'>
          <Skeleton active paragraph={{rows: 8}} />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      className={styles.page}
      justify='center'
      style={{backgroundColor: colorBgBase}}
    >
      <Flex vertical className={styles.content} gap='16px'>
        {/* Header */}
        <div className={styles.header}>
          <Button
            icon={<ArrowLeftOutlined size={32} />}
            type='text'
            onClick={() => navigate('/')}
          />
          <Title level={3} className={styles.title} style={{marginBottom: 0}}>
            {t('auth.profile.title')}
          </Title>
        </div>

        <Divider className={styles.divider} />

        {/* Main info */}
        <div className={styles.section}>
          <Title
            level={4}
            className={classNames(styles.title, styles.sectionTitle)}
            style={{marginBottom: 0, marginTop: 0}}
          >
            {t('auth.main_info.title')}
          </Title>

          <ProfileField
            label={t('auth.main_info.name_label')}
            value={user?.name}
            delay={animStyles.delay1}
            empty={notSpecified}
          />
          <ProfileField
            label={t('auth.main_info.age_label')}
            value={user?.age}
            delay={animStyles.delay2}
            empty={notSpecified}
          />
          <ProfileField
            label={t('auth.main_info.gender_label')}
            value={
              user?.gender
                ? t(`auth.main_info.gender_${user.gender}` as any)
                : undefined
            }
            delay={animStyles.delay3}
            empty={notSpecified}
          />
        </div>

        <Divider className={styles.divider} />

        <div className={styles.section}>
          <Title
            level={4}
            className={classNames(styles.title, styles.sectionTitle)}
            style={{marginBottom: 0, marginTop: 0}}
          >
            {t('auth.baptism_info.title')}
          </Title>

          <ProfileField
            label={t('auth.baptism_info.baptism_date_label')}
            value={user?.baptism_date ?? undefined}
            delay={animStyles.delay1}
            empty={notSpecified}
          />
          <ProfileField
            label={t('auth.baptism_info.marital_status_label')}
            value={user?.marriages_count}
            delay={animStyles.delay2}
            empty={notSpecified}
          />
          <ProfileField
            label={t('auth.baptism_info.children_label')}
            value={user?.children_count}
            delay={animStyles.delay3}
            empty={notSpecified}
          />
          <ProfileField
            label={t('auth.baptism_info.city_label')}
            value={user?.city_id}
            delay={animStyles.delay4}
            empty={notSpecified}
          />
        </div>

        <Divider className={styles.divider} />

        <div
          className={classNames(
            animStyles.fadeItem,
            animStyles.delay1,
            styles.section
          )}
        >
          <Title
            level={4}
            className={classNames(styles.title, styles.sectionTitle)}
            style={{marginBottom: 0, marginTop: 0}}
          >
            {t('auth.preview.interests_label')}
          </Title>

          {user?.interests?.length ? (
            <div className={styles.interestsContainer}>
              {user.interests.map((interest) => (
                <Tag key={interest}>
                  {/* @ts-expect-error - динамический ключ i18n */}
                  {t(`auth.interests.${interest}`)}
                </Tag>
              ))}
            </div>
          ) : (
            <Text className={styles.empty}>{notSpecified}</Text>
          )}
        </div>

        <Divider className={styles.divider} />

        <div
          className={classNames(
            animStyles.fadeItem,
            animStyles.delay2,
            styles.section
          )}
        >
          <Title
            level={4}
            className={classNames(styles.title, styles.sectionTitle)}
            style={{marginBottom: 0, marginTop: 0}}
          >
            {t('auth.preview.about_label')}
          </Title>

          {user?.bio ? (
            <Paragraph>{user.bio}</Paragraph>
          ) : (
            <Text className={styles.empty}>
              {t('auth.preview.about_placeholder')}
            </Text>
          )}
        </div>

        <Divider className={styles.divider} />

        {/* Contacts */}
        <div className={styles.section}>
          <Title
            level={4}
            className={classNames(styles.title, styles.sectionTitle)}
            style={{marginBottom: 0, marginTop: 0}}
          >
            {t('auth.contacts.title')}
          </Title>

          <ProfileField
            label='Telegram'
            value={user?.telegram}
            delay={animStyles.delay1}
            empty={notSpecified}
          />
          <ProfileField
            label='Email'
            value={user?.email}
            delay={animStyles.delay2}
            empty={notSpecified}
          />
          <ProfileField
            label={t('auth.contacts.phone_label')}
            value={user?.phone ?? undefined}
            delay={animStyles.delay3}
            empty={notSpecified}
          />
        </div>
      </Flex>
    </Flex>
  );
};

export default ProfilePage;
