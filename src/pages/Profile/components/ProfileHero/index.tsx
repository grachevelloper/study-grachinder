import {
  CalendarOutlined,
  CameraOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Flex,
  Form,
  Input,
  message,
  Select,
  Tag,
  theme,
  Typography,
} from 'antd';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';

import styles from '../../profile.module.css';

import type {User} from '~shared/typings/user';

import {useUpdateMainInfo, useUploadPhoto} from '~pages/Onboarding/api';

const {Title} = Typography;
const {Option} = Select;

interface ProfileHeroProps {
  user: User | undefined;
  citiesMap: Record<number, string>;
  isEditing: boolean;
  onEditStart: () => void;
  onEditEnd: () => void;
}

export const ProfileHero = ({
  user,
  citiesMap,
  isEditing,
  onEditStart,
  onEditEnd,
}: ProfileHeroProps) => {
  const {t} = useTranslation(['auth', 'common']);
  const {
    token: {colorBgContainer, colorPrimary, colorBorder},
  } = theme.useToken();

  const [form] = Form.useForm();
  const updateMain = useUpdateMainInfo();
  const uploadPhoto = useUploadPhoto();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      form.setFieldsValue({
        name: user?.name,
        age: user?.age,
        gender: user?.gender,
      });
    }
  }, [isEditing]);

  const handleSave = async () => {
    try {
      const v = await form.validateFields();
      await updateMain.mutateAsync({
        name: v.name,
        age: Number(v.age),
        gender: v.gender,
      });
      message.success(t('common:saved'));
      onEditEnd();
    } catch {
      // validation errors shown inline
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadPhoto.mutate(file, {
        onSuccess: () => message.success(t('common:saved')),
      });
    }
    e.target.value = '';
  };

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={styles.hero}
      style={{backgroundColor: colorBgContainer, borderColor: colorBorder}}
    >
      <div
        className={styles.avatarWrapper}
        onClick={() => avatarInputRef.current?.click()}
      >
        <Avatar
          size={80}
          src={user?.avatar_urls?.[0]}
          icon={!user?.avatar_urls?.[0] && <UserOutlined size={16} />}
          style={{
            backgroundColor: colorPrimary,
            fontSize: 28,
            display: 'block',
          }}
        >
          {!user?.avatar_urls?.[0] && initials}
        </Avatar>
        <div className={styles.avatarOverlay}>
          <CameraOutlined />
        </div>
        <input
          ref={avatarInputRef}
          type='file'
          accept='image/*'
          style={{display: 'none'}}
          onChange={handleAvatarChange}
        />
      </div>

      {isEditing ? (
        <Form form={form} layout='vertical' className={styles.mainForm}>
          <Flex gap={12} wrap='wrap'>
            <Form.Item
              name='name'
              className={styles.formItemInline}
              rules={[
                {required: true, message: t('auth.main_info.name_required')},
                {min: 2, message: t('auth.main_info.name_min_length')},
              ]}
            >
              <Input
                size='middle'
                placeholder={t('auth.main_info.name_placeholder')}
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              name='age'
              className={styles.formItemInlineSmall}
              rules={[
                {pattern: /^\d+$/, message: t('auth.main_info.age_invalid')},
              ]}
            >
              <Input
                size='middle'
                type='number'
                placeholder={t('auth.main_info.age_placeholder')}
                prefix={<CalendarOutlined />}
              />
            </Form.Item>
            <Form.Item name='gender' className={styles.formItemInlineSmall}>
              <Select
                size='middle'
                placeholder={t('auth.main_info.gender_placeholder')}
              >
                <Option value='male'>{t('auth.main_info.gender_male')}</Option>
                <Option value='female'>
                  {t('auth.main_info.gender_female')}
                </Option>
                <Option value='other'>
                  {t('auth.main_info.gender_other')}
                </Option>
              </Select>
            </Form.Item>
          </Flex>
          <Flex gap={8} className={styles.inlineActions}>
            <Button size='small' icon={<CloseOutlined />} onClick={onEditEnd} />
            <Button
              size='small'
              type='primary'
              icon={<CheckOutlined />}
              onClick={handleSave}
              loading={updateMain.isPending}
            />
          </Flex>
        </Form>
      ) : (
        <div className={styles.heroInfo}>
          <Flex align='center' gap={6}>
            <Title level={3} className={styles.heroName}>
              {user?.name}
            </Title>
            <Button
              type='text'
              size='small'
              icon={<EditOutlined />}
              onClick={onEditStart}
            />
          </Flex>
          <Flex wrap='wrap' gap={6} className={styles.heroMeta}>
            {user?.age && (
              <Tag icon={<CalendarOutlined />}>
                {t('auth.preview.age_format', {age: user.age})}
              </Tag>
            )}
            {user?.city_id && citiesMap[user.city_id] && (
              <Tag icon={<EnvironmentOutlined />}>
                {citiesMap[user.city_id]}
              </Tag>
            )}
            {user?.gender && (
              <Tag icon={<UserOutlined />}>
                {/* @ts-expect-error - динамический ключ i18n */}
                {t(`auth.main_info.gender_${user.gender}`)}
              </Tag>
            )}
          </Flex>
        </div>
      )}
    </div>
  );
};
