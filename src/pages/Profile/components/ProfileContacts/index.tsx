import {MailOutlined, PhoneOutlined, SendOutlined} from '@ant-design/icons';
import {Flex, Form, Input, message, Typography} from 'antd';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import styles from '../../profile.module.css';
import {SectionHeader} from '../SectionHeader';

import type {User} from '~shared/typings/user';

import {useUpdateContacts} from '~pages/Onboarding/api';

const {Text} = Typography;

interface ProfileContactsProps {
  user: User | undefined;
  notSpecified: string;
  isEditing: boolean;
  onEditStart: () => void;
  onEditEnd: () => void;
}

export const ProfileContacts = ({
  user,
  notSpecified,
  isEditing,
  onEditStart,
  onEditEnd,
}: ProfileContactsProps) => {
  const {t} = useTranslation(['auth', 'common']);
  const [form] = Form.useForm();
  const updateContacts = useUpdateContacts();

  useEffect(() => {
    if (isEditing) {
      form.setFieldsValue({
        telegram: user?.telegram,
        email: user?.email,
        phone: user?.phone,
      });
    }
  }, [isEditing]);

  const handleSave = async () => {
    try {
      const v = await form.validateFields();
      await updateContacts.mutateAsync({
        telegram: v.telegram,
        email: v.email,
        phone: v.phone,
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
        label={t('auth.contacts.title')}
        isEditing={isEditing}
        onEdit={onEditStart}
        onSave={handleSave}
        onCancel={onEditEnd}
        loading={updateContacts.isPending}
      />
      {isEditing ? (
        <Form form={form} layout='vertical'>
          <Form.Item name='telegram' label='Telegram' className={styles.formItem}>
            <Input size='middle' placeholder='@username' prefix={<SendOutlined />} />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            className={styles.formItem}
            rules={[{type: 'email', message: t('auth.contacts.email_invalid')}]}
          >
            <Input
              size='middle'
              placeholder='example@mail.com'
              prefix={<MailOutlined />}
            />
          </Form.Item>
          <Form.Item
            name='phone'
            label={t('auth.contacts.phone_label')}
            className={styles.formItem}
          >
            <Input
              size='middle'
              placeholder='+7 999 000 00 00'
              prefix={<PhoneOutlined />}
            />
          </Form.Item>
        </Form>
      ) : (
        <Flex vertical gap={12}>
          {user?.telegram && (
            <div className={styles.contactRow}>
              <SendOutlined className={styles.contactIcon} />
              <Text className={styles.fieldValue}>{user.telegram}</Text>
            </div>
          )}
          {user?.email && (
            <div className={styles.contactRow}>
              <MailOutlined className={styles.contactIcon} />
              <Text className={styles.fieldValue}>{user.email}</Text>
            </div>
          )}
          {user?.phone && (
            <div className={styles.contactRow}>
              <PhoneOutlined className={styles.contactIcon} />
              <Text className={styles.fieldValue}>{user.phone}</Text>
            </div>
          )}
          {!user?.telegram && !user?.email && !user?.phone && (
            <Text className={styles.empty}>{notSpecified}</Text>
          )}
        </Flex>
      )}
    </div>
  );
};
