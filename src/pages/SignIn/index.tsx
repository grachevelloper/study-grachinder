import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Flex, Input, Button, Typography, Grid} from 'antd';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import styles from './signin.module.css';

const {Title, Text, Link} = Typography;
const {useBreakpoint} = Grid;

const SignInPage = () => {
  const {t} = useTranslation('auth');
  const navigate = useNavigate();
  const screens = useBreakpoint();

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

  const getInputSize = () => {
    if (screens.xl) return 'large';
    if (screens.md) return 'middle';
    return 'small';
  };

  const getContainerWidth = () => {
    if (screens.xxl) return '600px';
    if (screens.xl) return '480px';
    if (screens.lg) return '360px';
    if (screens.md) return '340px';
    if (screens.sm) return '320px';
    return '300px';
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
          maxWidth: getContainerWidth(),
        }}
      >
        <Input
          prefix={<UserOutlined />}
          size={getInputSize()}
          placeholder={t('name.placeholder')}
          style={{
            fontSize: screens.md ? '16px' : '14px',
          }}
        />

        <Input
          prefix={<LockOutlined />}
          size={getInputSize()}
          type='password'
          placeholder={t('password.placeholder')}
          style={{
            fontSize: screens.md ? '16px' : '14px',
          }}
        />

        <Button
          type='primary'
          variant='filled'
          size={getInputSize()}
          color='primary'
          className={styles.button}
          onClick={handleSubmit}
          loading={true}
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
