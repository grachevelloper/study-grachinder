import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Flex, Input, Button, Typography} from 'antd';
import {useTranslation} from 'react-i18next';
import {Fragment} from 'react/jsx-runtime';

import styles from './signin.module.css';
import {useNavigate} from 'react-router-dom';

const {Title, Text, Link} = Typography;

export default () => {
  const {t} = useTranslation('auth');
  const navigate = useNavigate();

  const handleToRegister = () => {
    navigate('/auth/signup', {
      state: {
        from: '/auth/signin',
      },
    });
  };

  const handleSubmit = () => {
    navigate('/');
  };

  return (
    <Flex
      vertical
      gap='18px'
      justify='center'
      align='center'
      className={styles.wrapper}
    >
      <Flex
        vertical
        justify='end'
        align='center'
        className={styles.text_wrapper}
      >
        <Title level={1} rootClassName={styles.title}>
          {t('auth.signin.title')}
        </Title>
        <Text className={styles.text}>{t('auth.signin.subtitle')}</Text>
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

      <Button
        type='primary'
        variant='filled'
        size='large'
        color='primary'
        className={styles.button}
        onClick={handleSubmit}
        loading={true}
      >
        {t('auth.registration.apply')}
      </Button>
      <Text className={styles.text}>
        {t('auth.have_not_account.title')}
        <Link onClick={handleToRegister}>
          {t('auth.have_not_account.link')}
        </Link>
      </Text>
    </Flex>
  );
};
