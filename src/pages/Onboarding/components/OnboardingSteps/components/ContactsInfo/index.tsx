import {Typography, Button, Form, Flex, Input} from 'antd';
import {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {PhoneOutlined, MailOutlined, SendOutlined} from '@ant-design/icons';
import classNames from 'classnames';

import styles from './contacts-info.module.css';
import baseStyles from '../../onboarding-steps.module.css';
import type {UserFormData} from '~shared/typings/user';

const {Title, Text} = Typography;

interface ContactsInfoProps {
  onSumbit: () => void;
  onBack: () => void;
  loading: boolean;
}

interface ContactsInfoFormData extends Pick<
  UserFormData,
  'telegram' | 'email' | 'phone'
> {}

export const ContactsInfo = ({
  onSumbit,
  onBack,
  loading,
}: ContactsInfoProps) => {
  const {t} = useTranslation(['auth', 'common']);

  const handleSubmit = async () => {
    try {
      onSumbit();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Fragment>
      <Title level={2} className={baseStyles.title}>
        {t('auth.contacts.title')}
      </Title>

      <Text className={baseStyles.subtitle}>{t('auth.contacts.subtitle')}</Text>

      <div className={classNames(baseStyles.fadeItem, baseStyles.delay1)}>
        <Form.Item
          name='telegram'
          label={
            <Text strong>
              Telegram
              <Text type='secondary'> ({t('common:optional')})</Text>
            </Text>
          }
          rules={[{max: 50, message: t('auth.contacts.telegram_max_length')}]}
          className={styles.formItem}
          layout='vertical'
        >
          <Input
            size='large'
            placeholder='@username'
            prefix={<SendOutlined />}
          />
        </Form.Item>
      </div>

      <div className={classNames(baseStyles.fadeItem, baseStyles.delay2)}>
        <Form.Item
          name='phone'
          label={
            <Text strong>
              {t('auth.contacts.phone_label')}
              <Text type='secondary'> ({t('common:optional')})</Text>
            </Text>
          }
          rules={[
            {
              pattern: /^[\+\d\s\(\)\-]+$/,
              message: t('auth.contacts.phone_invalid'),
            },
          ]}
          className={styles.formItem}
          layout='vertical'
        >
          <Input
            size='large'
            placeholder='+7 (999) 123-45-67'
            prefix={<PhoneOutlined />}
          />
        </Form.Item>
      </div>

      <div className={classNames(baseStyles.fadeItem, baseStyles.delay3)}>
        <Form.Item
          name='email'
          label={
            <Text strong>
              Email
              <Text type='secondary'> ({t('common:optional')})</Text>
            </Text>
          }
          rules={[{type: 'email', message: t('auth.contacts.email_invalid')}]}
          className={styles.formItem}
          layout='vertical'
        >
          <Input
            size='large'
            placeholder='example@mail.com'
            prefix={<MailOutlined />}
          />
        </Form.Item>
      </div>

      <Flex
        gap={12}
        className={classNames(baseStyles.fadeItem, baseStyles.delay4)}
      >
        <Button size='large' block onClick={onBack}>
          {t('common:back')}
        </Button>
        <Button
          type='primary'
          size='large'
          block
          color='primary'
          variant='filled'
          onClick={handleSubmit}
          loading={loading}
        >
          {t('common:finish')}
        </Button>
      </Flex>
    </Fragment>
  );
};
