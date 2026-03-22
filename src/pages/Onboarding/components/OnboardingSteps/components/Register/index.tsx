import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Flex, Input, Typography} from 'antd';
import {Fragment} from 'react';
import {useTranslation} from 'react-i18next';

import styles from './register.module.css';

import type {StepProps} from '../../types';


import {AUTH_EVENT, AuthEmitter} from '~shared/events/auth';

const {Title, Text} = Typography;

export const Register = ({loading, onSumbit}: StepProps) => {
  const {t} = useTranslation('auth');

  const handleSubmit = async () => {
    await onSumbit();
    AuthEmitter.emit(AUTH_EVENT, (prev: number) => (prev = 1));
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
      />
      <Input
        prefix={<LockOutlined />}
        size='large'
        type='password'
        placeholder={t('password.placeholder')}
      />
      <Input
        prefix={<LockOutlined />}
        size='large'
        type='password'
        placeholder={t('password_check.placeholder')}
      />

      <Button
        type='primary'
        variant='filled'
        size='large'
        color='primary'
        className={styles.button}
        onClick={handleSubmit}
        loading={loading}
      >
        {t('auth.registration.apply')}
      </Button>
    </Fragment>
  );
};
