import {Col, Flex, Image, Row} from 'antd';
import {Fragment, type PropsWithChildren} from 'react';
import layoutImg from '~assets/layout.png';

import styles from './layout.module.css';

interface LayoutProps {}

export const Layout = ({children}: PropsWithChildren<LayoutProps>) => {
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
        <Col flex={14}>
          <Flex
            vertical
            justify='center'
            align='center'
            className={styles.children}
          >
            {children}
          </Flex>
        </Col>
      </Row>
    </Fragment>
  );
};
