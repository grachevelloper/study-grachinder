import {HeartOutlined} from '@ant-design/icons';
import {DatePicker, Form, Input, message, Select, Typography} from 'antd';
import dayjs from 'dayjs';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import styles from '../../profile.module.css';
import {SectionHeader} from '../SectionHeader';

import type {User} from '~shared/typings/user';

import {useUpdateBaptismInfo} from '~pages/Onboarding/api';

const {Text} = Typography;

interface ProfileChurchProps {
  user: User | undefined;
  notSpecified: string;
  citiesMap: Record<number, string>;
  isEditing: boolean;
  onEditStart: () => void;
  onEditEnd: () => void;
}

export const ProfileChurch = ({
  user,
  notSpecified,
  citiesMap,
  isEditing,
  onEditStart,
  onEditEnd,
}: ProfileChurchProps) => {
  const {t} = useTranslation(['auth', 'common']);
  const [form] = Form.useForm();
  const updateChurch = useUpdateBaptismInfo();

  useEffect(() => {
    if (isEditing) {
      form.setFieldsValue({
        baptismDate: user?.baptism_date ? dayjs(user.baptism_date) : undefined,
        children_count: user?.children_count,
        city_id: user?.city_id,
      });
    }
  }, [isEditing]);

  const handleSave = async () => {
    try {
      const v = await form.validateFields();
      await updateChurch.mutateAsync({
        baptismDate: v.baptismDate?.toISOString(),
        children_count: v.children_count ? Number(v.children_count) : undefined,
        city_id: v.city_id,
      });
      message.success(t('common:saved'));
      onEditEnd();
    } catch {
      // validation errors shown inline
    }
  };

  return (
    <div className={styles.section}>
      <SectionHeader
        label={t('auth.baptism_info.title')}
        isEditing={isEditing}
        onEdit={onEditStart}
        onSave={handleSave}
        onCancel={onEditEnd}
        loading={updateChurch.isPending}
      />
      {isEditing ? (
        <Form form={form} layout='vertical'>
          <div className={styles.fieldGrid}>
            <Form.Item
              name='baptismDate'
              label={t('auth.baptism_info.baptism_date_label')}
              className={styles.formItem}
              getValueProps={(v) => ({value: v ? dayjs(v) : undefined})}
            >
              <DatePicker
                size='middle'
                style={{width: '100%'}}
                format='DD.MM.YYYY'
                placeholder={t('auth.baptism_info.baptism_date_placeholder')}
              />
            </Form.Item>
            <Form.Item
              name='children_count'
              label={t('auth.baptism_info.children_label')}
              className={styles.formItem}
              rules={[{pattern: /^\d+$/, message: t('auth.baptism_info.children_invalid')}]}
            >
              <Input
                size='middle'
                type='number'
                placeholder={t('auth.baptism_info.children_placeholder')}
                prefix={<HeartOutlined />}
              />
            </Form.Item>
            <Form.Item
              name='city_id'
              label={t('auth.baptism_info.city_label')}
              className={styles.formItem}
            >
              <Select
                size='middle'
                placeholder={t('auth.baptism_info.city_placeholder')}
                showSearch
                optionFilterProp='label'
                options={Object.entries(citiesMap).map(([id, name]) => ({
                  value: Number(id),
                  label: name,
                }))}
              />
            </Form.Item>
          </div>
        </Form>
      ) : (
        <div className={styles.fieldGrid}>
          <div className={styles.field}>
            <Text className={styles.fieldLabel}>
              {t('auth.baptism_info.baptism_date_label')}
            </Text>
            <Text className={styles.fieldValue}>
              {user?.baptism_date ?? (
                <span className={styles.empty}>{notSpecified}</span>
              )}
            </Text>
          </div>
          <div className={styles.field}>
            <Text className={styles.fieldLabel}>
              {t('auth.baptism_info.children_label')}
            </Text>
            <Text className={styles.fieldValue}>
              {user?.children_count !== undefined ? (
                user.children_count
              ) : (
                <span className={styles.empty}>{notSpecified}</span>
              )}
            </Text>
          </div>
          <div className={styles.field}>
            <Text className={styles.fieldLabel}>
              {t('auth.baptism_info.city_label')}
            </Text>
            <Text className={styles.fieldValue}>
              {user?.city_id ? (citiesMap[user.city_id] ?? user.city) : user?.city ? user.city : (
                <span className={styles.empty}>{notSpecified}</span>
              )}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};
