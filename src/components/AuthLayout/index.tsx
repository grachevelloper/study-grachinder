import {Col, Flex, Image, Row} from 'antd';
import {Fragment} from 'react';
import layoutImg from '~assets/layout.png';

import styles from './auth-layout.module.css';
import {Outlet, useLocation} from 'react-router-dom';
import {useLocalStorage} from '~shared/hooks/useLocalStorage';
import {ONBOARDING_STEP_COUNT_KEY} from '~shared/constants';

export const AuthLayout = () => {
  const location = useLocation();
  const [step, _] = useLocalStorage<number>(ONBOARDING_STEP_COUNT_KEY);
  const isUserMeta = location.pathname === '/auth/signup' && step >= 1;

  return (
    <Fragment>
      <Row justify='center' align='middle' className={styles.layout}>
        <Col flex={1}>
          <Flex justify='end'>
            <Image
              src={layoutImg}
              preview={false}
              height='100vh'
              width='125px'
              className={styles.image}
            />
          </Flex>
        </Col>
        <Col flex={14} className={styles.children_wrapper}>
          <Flex
            vertical
            justify={isUserMeta ? 'start' : 'center'}
            align={isUserMeta ? 'top' : 'middle'}
            className={styles.children}
            style={{
              margin: isUserMeta ? '80px' : '25% auto 0',
            }}
          >
            <Outlet />
          </Flex>
        </Col>
      </Row>
    </Fragment>
  );
};
