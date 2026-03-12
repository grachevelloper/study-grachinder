import {useAuth} from '~shared/providers/Auth';
import {OnboadringSteps} from './components/OnboardingSteps';
import {Button, Flex, FloatButton, notification, theme, Typography} from 'antd';
import {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-dom';
import {LoginOutlined} from '@ant-design/icons';
import {useSessionStorage} from '~shared/hooks/useSessionStorage';
import {NOTIFICATION_AUTH_SHOWED} from './constants';
import {Preview} from './components/Preview';

import styles from './onboadring.module.css';

const {Title, Text} = Typography;

export default () => {
  const {user} = useAuth();
  const [api, contextHolder] = notification.useNotification();
  const {t} = useTranslation('auth');
  const navigate = useNavigate();
  const location = useLocation();
  const {token} = theme.useToken();

  const [isNotificationShowed, setNotificationShowed] = useSessionStorage(
    NOTIFICATION_AUTH_SHOWED,
    false
  );
  let isNotificationAuthToggled = isNotificationShowed;

  const handleClickToSignIn = () => {
    navigate('/auth/signin');
  };

  useEffect(() => {
    const needToShowNotification =
      !user &&
      !isNotificationAuthToggled &&
      location.state?.from !== '/auth/signin';

    if (needToShowNotification) {
      api.open({
        title: (
          <Title
            style={{
              margin: 0,
            }}
            level={4}
          >
            {t('auth.have_account.title')}
          </Title>
        ),
        description: (
          <Flex vertical justify='start' align='start' gap='8px'>
            <Text>{t('auth.have_account.subtitle')}</Text>
            <Button
              variant='filled'
              color='primary'
              size='medium'
              onClick={handleClickToSignIn}
            >
              {t('auth.have_account.button')}
            </Button>
          </Flex>
        ),
        showProgress: true,
        placement: 'bottomRight',
        closable: true,
        pauseOnHover: true,
      });

      isNotificationAuthToggled = true;
      setNotificationShowed(true);
    }
  }, [user, isNotificationAuthToggled]);

  const renderFloatButtonToSignIn = useMemo(() => {
    return (
      !user && (
        <FloatButton
          icon={<LoginOutlined color={token.colorPrimary} />}
          type='primary'
          style={{insetInlineEnd: 32, backgroundColor: token.colorPrimary}}
          onClick={handleClickToSignIn}
        />
      )
    );
  }, [user, isNotificationShowed]);

  return (
    <Flex
      className={styles.onboadrind}
      justify='space-between'
      align='flex-start'
    >
      {contextHolder}
      <OnboadringSteps />
      <Preview name='' gender='male' />
      {renderFloatButtonToSignIn}
    </Flex>
  );
};
