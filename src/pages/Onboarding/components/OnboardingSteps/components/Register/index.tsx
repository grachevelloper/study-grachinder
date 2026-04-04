import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Flex, Input, Typography, message} from 'antd';
import {Fragment, useState} from 'react';
import {useTranslation} from 'react-i18next';

import styles from './register.module.css';

import type {StepProps} from '../../types';

import {useRegister} from '~pages/SignIn/api';
import {AUTH_EVENT, AuthEmitter} from '~shared/events/auth';

const {Title, Text} = Typography;

export const Register = ({onSumbit}: StepProps) => {
  const {t} = useTranslation('auth');
  const [form, setForm] = useState({email: '', password: '', passwordCheck: ''});
  const register = useRegister();

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({...prev, [field]: e.target.value}));

  const handleSubmit = async () => {
    if (!form.email || !form.password) return;
    if (form.password !== form.passwordCheck) {
      message.error(t('password_check.mismatch'));
      return;
    }
    register.mutate({email: form.email, password: form.password}, {
      onSuccess: async () => {
        await onSumbit();
        AuthEmitter.emit(AUTH_EVENT, 1);
      },
      onError: () => message.error(t('auth.registration.error')),
    });
  };

  return (
    <Fragment>
      <Flex
        vertical
        justify='end'
        align='center'
        className={styles.text_wrapper}
      >
        <Title level={1} rootClassName={styles.title}>
          {t('auth.registration.title')}
        </Title>
        <Text className={styles.subtitle}>
          {t('auth.registration.subtitle')}
        </Text>
      </Flex>
      <Input
        prefix={<UserOutlined />}
        size='large'
        placeholder={t('name.placeholder')}
        value={form.email}
        onChange={set('email')}
      />
      <Input
        prefix={<LockOutlined />}
        size='large'
        type='password'
        placeholder={t('password.placeholder')}
        value={form.password}
        onChange={set('password')}
      />
      <Input
        prefix={<LockOutlined />}
        size='large'
        type='password'
        placeholder={t('password_check.placeholder')}
        value={form.passwordCheck}
        onChange={set('passwordCheck')}
        onPressEnter={handleSubmit}
      />

      <Button
        type='primary'
        variant='filled'
        size='large'
        color='primary'
        className={styles.button}
        onClick={handleSubmit}
        loading={register.isPending}
      >
        {t('auth.registration.apply')}
      </Button>
    </Fragment>
  );
};
