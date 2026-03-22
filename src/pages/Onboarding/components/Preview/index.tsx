import {Typography, Card, Avatar, Space, Tag, Divider, Flex} from 'antd';
import {Fragment, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  UserOutlined,
  CalendarOutlined,
  ManOutlined,
  WomanOutlined,
  QuestionOutlined,
  HeartOutlined,
  StarOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';

import styles from './preview.module.css';

const {Title, Text} = Typography;

interface PreviewProps {
  name: string;
  age?: string;
  gender: 'male' | 'female' | 'other';
  photo?: File | null;
  city?: string;
  about?: string;
  interests?: string[];
}

export const Preview = ({
  name,
  age,
  gender,
  photo,
  city = '',
  about = '',
  interests = [],
}: PreviewProps) => {
  const {t} = useTranslation(['auth']);

  const [previewData] = useState<PreviewProps>({
    name,
    age,
    gender,
    photo,
    city,
    about,
    interests,
  });

  const getGenderIcon = () => {
    switch (gender) {
      case 'male':
        return <ManOutlined className={styles.genderIconMale} />;
      case 'female':
        return <WomanOutlined className={styles.genderIconFemale} />;
      default:
        return <QuestionOutlined className={styles.genderIconOther} />;
    }
  };

  const getGenderText = () => {
    switch (gender) {
      case 'male':
        return t('auth.main_info.gender_male');
      case 'female':
        return t('auth.main_info.gender_female');
      default:
        return t('auth.main_info.gender_other');
    }
  };

  const photoUrl = photo ? URL.createObjectURL(photo) : null;

  return (
    <Fragment>
      <Flex vertical align='center' className={styles.container}>
        <div className={styles.avatarWrapper}>
          <Avatar
            size={120}
            src={photoUrl}
            icon={!photoUrl && <UserOutlined />}
            className={classNames(styles.avatar, {
              [styles.avatarWithPhoto]: photoUrl,
            })}
          />
          {photoUrl && <div className={styles.avatarGlow} />}
        </div>

        <Space align='center' className={styles.nameSection}>
          <Text strong className={styles.name}>
            {previewData.name || t('auth.preview.unknown_name')}
          </Text>
          {age && (
            <Tag icon={<CalendarOutlined />} className={styles.ageTag}>
              {t('auth.preview.age_format', {age})}
            </Tag>
          )}
        </Space>

        <div className={styles.genderSection}>
          {getGenderIcon()}
          <Text className={styles.genderText}>{getGenderText()}</Text>
        </div>

        {city && (
          <div className={styles.citySection}>
            <EnvironmentOutlined className={styles.cityIcon} />
            <Text className={styles.cityText}>
              {t('auth.preview.city_format', {city: previewData.city})}
            </Text>
          </div>
        )}

        <Divider className={styles.divider} />

        <div className={styles.aboutSection}>
          <Text strong className={styles.aboutLabel}>
            {t('auth.preview.about_label')}
          </Text>
          <Text className={styles.aboutText}>
            {previewData.about || t('auth.preview.about_placeholder')}
          </Text>
        </div>

        {interests.length > 0 && (
          <div className={styles.interestsSection}>
            <Text strong className={styles.interestsLabel}>
              {t('auth.preview.interests_label')}
            </Text>
            <Flex wrap gap='small' className={styles.interestsList}>
              {interests.map((interest, index) => (
                <Tag key={index} className={styles.interestTag}>
                  <StarOutlined /> {interest}
                </Tag>
              ))}
            </Flex>
          </div>
        )}

        <div className={styles.statusSection}>
          <div className={styles.statusDot} />
          <Text type='secondary' className={styles.statusText}>
            {t('auth.preview.status')}
          </Text>
        </div>
      </Flex>
    </Fragment>
  );
};
