import {Col, Flex, Image, Row, theme} from 'antd';
import {Fragment} from 'react';
import {Outlet, useLocation} from 'react-router-dom';

import styles from './auth-layout.module.css';

import layoutImg from '~assets/layout.png';
import {ErrorBoundary} from '~components/ErrorBoundary';
import {ONBOARDING_STEP_COUNT_KEY} from '~shared/constants';
import {useAuthStepsListen} from '~shared/hooks/useAuthStepsListen';
import {useLocalStorage} from '~shared/hooks/useLocalStorage';

export const AuthLayout = () => {
  const location = useLocation();
  const [stepCount, setStep] = useLocalStorage<number>(
    ONBOARDING_STEP_COUNT_KEY
  );
  const {
    token: {colorBgBase},
  } = theme.useToken();

  const isUserMeta = location.pathname === '/auth/signup' && stepCount >= 1;
  const isDesktop = window.innerWidth > 1200;

  const handleStepChange = (newStep: number) => {
    if (newStep !== stepCount) {
      setStep(newStep);
    }
  };

  useAuthStepsListen({onStepChange: handleStepChange, stepCount});

  return (
    <Fragment>
      <Row
        justify='center'
        align='middle'
        className={styles.layout}
        style={{
          backgroundColor: colorBgBase,
        }}
      >
        <Col>
          <Flex justify='end' className={styles.image_wrapper}>
            <Image
              src={layoutImg}
              preview={false}
              height='100dvh'
              width='125px'
              className={styles.image}
            />
          </Flex>
        </Col>
        <Col flex={1} className={styles.children_wrapper}>
          <Flex
            vertical
            justify={isUserMeta ? 'start' : 'center'}
            align={isUserMeta ? 'top' : 'middle'}
            className={styles.children}
            style={{
              margin: isDesktop
                ? isUserMeta
                  ? '50px 0 0 40px'
                  : '0 auto'
                : undefined,
            }}
          >
            <ErrorBoundary scope='auth'>
              <Outlet />
            </ErrorBoundary>
          </Flex>
        </Col>
      </Row>
    </Fragment>
  );
};
