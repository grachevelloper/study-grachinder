import {Button, Flex, Typography, theme} from 'antd';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import styles from './not-found.module.css';

const {Title, Text} = Typography;

const NotFound = () => {
  const {t} = useTranslation('common');
  const navigate = useNavigate();
  const {token: {colorPrimary, colorBgBase, colorTextSecondary}} = theme.useToken();

  return (
    <Flex
      vertical
      align='center'
      justify='center'
      className={styles.page}
      style={{backgroundColor: colorBgBase}}
    >
      <Title className={styles.code} style={{color: colorPrimary}}>
        404
      </Title>

      <Title level={3} className={styles.title}>
        {t('not_found.title')}
      </Title>

      <Text className={styles.description} style={{color: colorTextSecondary}}>
        {t('not_found.description')}
      </Text>

      <Button
        type='primary'
        variant='filled'
        color='primary'
        size='large'
        className={styles.button}
        onClick={() => navigate('/')}
      >
        {t('not_found.back')}
      </Button>
    </Flex>
  );
};

export default NotFound;
