import {Col, Flex, Image, Row} from 'antd';
import {Fragment, useEffect} from 'react';
import layoutImg from '~assets/layout.png';

import styles from './auth-layout.module.css';
import {Outlet, useLocation} from 'react-router-dom';
import {useLocalStorage} from '~shared/hooks/useLocalStorage';
import {ONBOARDING_STEP_COUNT_KEY} from '~shared/constants';
import {AUTH_EVENT, AuthEmitter} from '~shared/events/auth';

export const AuthLayout = () => {
  const location = useLocation();
  const [step, setStep] = useLocalStorage<number>(ONBOARDING_STEP_COUNT_KEY);

  const isUserMeta = location.pathname === '/auth/signup' && step >= 1;
  console.log(isUserMeta, step);
  useEffect(() => {
    const handleSignStepChange = (newStep: number) => {
      if (newStep !== step) {
        setStep(newStep);
      }
    };

    AuthEmitter.on(AUTH_EVENT, handleSignStepChange);
    return () => {
      AuthEmitter.off(AUTH_EVENT, handleSignStepChange);
    };
  }, [setStep, AuthEmitter]);

  return (
    <Fragment>
      <Row justify='center' align='middle' className={styles.layout}>
        <Col>
          <Flex justify='end' className={styles.image_wrapper}>
            <Image
              src={layoutImg}
              preview={false}
              height='100vh'
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
              margin: isUserMeta ? '50px 0 0 40px' : '15% auto 0 ',
            }}
          >
            <Outlet />
          </Flex>
        </Col>
      </Row>
    </Fragment>
  );
};
