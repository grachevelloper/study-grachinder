import {Typography, Button, Form, Flex, Input} from 'antd';
import classNames from 'classnames';
import {Fragment} from 'react';
import {useTranslation} from 'react-i18next';

import baseStyles from '../../onboarding-steps.module.css';

import styles from './about-info.module.css';

const {Title, Text} = Typography;
const {TextArea} = Input;

interface AboutInfoProps {
  onSumbit: () => void;
  onBack: () => void;
  loading: boolean;
}

// type AboutInfoFormData = Pick<UserFormData, 'bio'>;

export const AboutInfo = ({onSumbit, onBack, loading}: AboutInfoProps) => {
  const {t} = useTranslation(['auth', 'common']);

  const handleSubmit = async () => {
    try {
      onSumbit();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Fragment>
      <Title level={2} className={baseStyles.title}>
        {t('auth.about.title')}
      </Title>

      <Text className={baseStyles.subtitle}>{t('auth.about.subtitle')}</Text>

      <div className={classNames(baseStyles.fadeItem, baseStyles.delay1)}>
        <Form.Item
          name='bio'
          label={
            <Text strong>
              {t('auth.about.about_label')}
              <Text type='secondary'> ({t('common:optional')})</Text>
            </Text>
          }
          className={styles.formItem}
          layout='vertical'
        >
          <TextArea
            size='large'
            placeholder={t('auth.about.about_placeholder')}
            autoSize={{minRows: 6, maxRows: 12}}
            showCount
            maxLength={1000}
            className={styles.textarea}
          />
        </Form.Item>
      </div>

      <Flex
        gap={12}
        className={classNames(baseStyles.fadeItem, baseStyles.delay2)}
      >
        <Button size='large' block onClick={onBack}>
          {t('common:back')}
        </Button>
        <Button
          type='primary'
          size='large'
          block
          color='primary'
          variant='filled'
          onClick={handleSubmit}
          loading={loading}
        >
          {t('common:continue')}
        </Button>
      </Flex>
    </Fragment>
  );
};
