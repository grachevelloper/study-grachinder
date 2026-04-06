import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Flex, Input, Button, Typography, Grid, message} from 'antd';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import {useSignIn} from './api';

import styles from './signin.module.css';

const {Title, Text, Link} = Typography;
const {useBreakpoint} = Grid;

const SignInPage = () => {
  const {t} = useTranslation('auth');
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const [form, setForm] = useState({email: '', password: ''});
  const signIn = useSignIn();

  const isDesktop = window.innerWidth > 1200;

  const handleToRegister = () => {
    navigate('/auth/signup', {
      state: {
        from: '/auth/signin',
      },
    });
  };

  const handleSubmit = () => {
    if (!form.email || !form.password) return;
    signIn.mutate(form, {
      onSuccess: () => navigate('/'),
      onError: () => message.error(t('auth.signin.error')),
    });
  };

  const getInputSize = () => {
    if (screens.xl) return 'large';
    if (screens.md) return 'middle';
    return 'small';
  };

  const getGap = () => {
    if (screens.md) return '18px';
    return '12px';
  };

  return (
    <Flex
      vertical
      gap={getGap()}
      justify='center'
      align='center'
      className={styles.wrapper}
      style={{
        margin: '0 auto',
        padding: screens.md ? '20px' : '16px',
        right: isDesktop ? '5%' : '0',
      }}
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

      <Flex
        vertical
        gap={screens.md ? '16px' : '12px'}
        style={{
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <Input
          prefix={<UserOutlined />}
          size={getInputSize()}
          placeholder={t('name.placeholder')}
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({...prev, email: e.target.value}))
          }
          style={{
            fontSize: screens.md ? '16px' : '14px',
          }}
        />

        <Input
          prefix={<LockOutlined />}
          size={getInputSize()}
          type='password'
          placeholder={t('password.placeholder')}
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({...prev, password: e.target.value}))
          }
          onPressEnter={handleSubmit}
          style={{
            fontSize: screens.md ? '16px' : '14px',
          }}
        />

        <Button
          type='primary'
          variant='filled'
          color='primary'
          size={getInputSize()}
          className={styles.button}
          onClick={handleSubmit}
          loading={signIn.isPending}
          style={{
            fontSize: screens.md ? '16px' : '14px',
            marginTop: screens.md ? '8px' : '4px',
          }}
        >
          {t('auth.registration.apply')}
        </Button>

        <Text
          className={styles.text}
          style={{
            fontSize: screens.md ? '16px' : '14px',
            textAlign: 'center',
          }}
        >
          {t('auth.have_not_account.title')}{' '}
          <Link
            onClick={handleToRegister}
            style={{
              fontSize: screens.md ? '16px' : '14px',
              marginLeft: '4px',
            }}
          >
            {t('auth.have_not_account.link')}
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};
export default SignInPage;
