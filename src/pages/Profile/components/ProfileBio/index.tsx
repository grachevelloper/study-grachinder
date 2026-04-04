import {Form, Input, message, Typography} from 'antd';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import styles from '../../profile.module.css';
import {SectionHeader} from '../SectionHeader';

import type {User} from '~shared/typings/user';

import {useUpdateBio} from '~pages/Onboarding/api';

const {Paragraph, Text} = Typography;
const {TextArea} = Input;

interface ProfileBioProps {
  user: User | undefined;
  isEditing: boolean;
  onEditStart: () => void;
  onEditEnd: () => void;
}

export const ProfileBio = ({
  user,
  isEditing,
  onEditStart,
  onEditEnd,
}: ProfileBioProps) => {
  const {t} = useTranslation(['auth', 'common']);
  const [form] = Form.useForm();
  const updateBio = useUpdateBio();

  useEffect(() => {
    if (isEditing) form.setFieldsValue({bio: user?.bio});
  }, [isEditing]);

  const handleSave = async () => {
    try {
      const v = await form.validateFields();
      await updateBio.mutateAsync({bio: v.bio});
      message.success(t('common:saved'));
      onEditEnd();
    } catch {
      // validation errors shown inline
    }
  };

  return (
    <div className={styles.section}>
      <SectionHeader
        label={t('auth.preview.about_label')}
        isEditing={isEditing}
        onEdit={onEditStart}
        onSave={handleSave}
        onCancel={onEditEnd}
        loading={updateBio.isPending}
      />
      {isEditing ? (
        <Form form={form} layout='vertical'>
          <Form.Item name='bio' style={{marginBottom: 0}}>
            <TextArea
              autoSize={{minRows: 4, maxRows: 10}}
              placeholder={t('auth.about.about_placeholder')}
              showCount
              maxLength={1000}
            />
          </Form.Item>
        </Form>
      ) : user?.bio ? (
        <Paragraph className={styles.bioText}>{user.bio}</Paragraph>
      ) : (
        <Text className={styles.empty}>{t('auth.preview.about_placeholder')}</Text>
      )}
    </div>
  );
};
