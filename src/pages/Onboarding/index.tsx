import {LoginOutlined} from '@ant-design/icons';
import {Button, Flex, FloatButton, notification, theme, Typography} from 'antd';
import {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-dom';

import {OnboadringSteps} from './components/OnboardingSteps';
import {Preview} from './components/Preview';
import {NOTIFICATION_AUTH_SHOWED} from './constants';

import styles from './onboadring.module.css';

import {ONBOARDING_STEP_COUNT_KEY} from '~shared/constants';
import {useAuthStepsListen} from '~shared/hooks/useAuthStepsListen';
import {useLocalStorage} from '~shared/hooks/useLocalStorage';
import {useSessionStorage} from '~shared/hooks/useSessionStorage';
import {useAuth} from '~shared/providers/Auth';

const {Title, Text} = Typography;

const OnnboardingPage = () => {
  const {user} = useAuth();
  const [api, contextHolder] = notification.useNotification();
  const {t} = useTranslation('auth');
  const navigate = useNavigate();
  const location = useLocation();
  const {token} = theme.useToken();
  const [stepCount, setStep] = useLocalStorage<number>(
    ONBOARDING_STEP_COUNT_KEY
  );

  const isDesktop = window.innerWidth > 1200;

  const handleStepChange = (newStep: number) => {
    if (newStep !== stepCount) {
      setStep(newStep);
    }
  };

  useAuthStepsListen({onStepChange: handleStepChange, stepCount});

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
      className={styles.onboarding}
      justify='space-around'
      align='flex-start'
      style={{
        right: isDesktop ? '5%' : '0',
      }}
    >
      {contextHolder}
      <OnboadringSteps />
      {stepCount && isDesktop && <Preview />}
      {renderFloatButtonToSignIn}
    </Flex>
  );
};

export default OnnboardingPage;
