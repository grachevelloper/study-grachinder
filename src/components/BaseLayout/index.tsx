import {ArrowLeftOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Col, Flex, Image, Row, theme} from 'antd';
import {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom';

import styles from './base-layout.module.css';

import layoutImg from '~assets/layout.png';
import {getToken} from '~shared/config/api';

export const BaseLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!getToken()) {
    return <Navigate to='/auth/signin' replace />;
  }
  const {i18n} = useTranslation();
  const {
    token: {colorBgBase, colorPrimary},
  } = theme.useToken();

  const isProfile = location.pathname === '/profile';

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Fragment>
      <Flex align='center' gap={4} className={styles.header}>
        <Button
          type='text'
          onClick={toggleLanguage}
          className={styles.lang_btn}
        >
          {i18n.language === 'ru' ? 'EN' : 'RU'}
        </Button>
        <Button
          type='text'
          className={styles.icon_btn}
          icon={
            isProfile ? (
              <ArrowLeftOutlined style={{color: colorPrimary, fontSize: 16}} />
            ) : (
              <UserOutlined style={{color: colorPrimary, fontSize: 16}} />
            )
          }
          onClick={() => navigate(isProfile ? '/' : '/profile')}
        />
      </Flex>
      <Row
        justify='center'
        align='middle'
        className={styles.layout}
        style={{backgroundColor: colorBgBase}}
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
          <Flex vertical className={styles.children}>
            <Outlet />
          </Flex>
        </Col>
      </Row>
    </Fragment>
  );
};
