import {
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {Typography, Input, Button, Select, Form, DatePicker, Flex} from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import {Fragment} from 'react';
import {useTranslation} from 'react-i18next';

import baseStyles from '../../onboarding-steps.module.css';

import styles from './baptism-info.module.css';

import type {UserFormData} from '~shared/typings/user';

const {Title, Text} = Typography;
const {Option} = Select;

interface BaptismInfoProps {
  onSumbit: () => void;
  onBack: () => void;
  loading: boolean;
}

type BaptismInfoFormData = Pick<UserFormData, 'baptism_date'> & {};

export const BaptismInfo = ({onSumbit, onBack, loading}: BaptismInfoProps) => {
  const {t} = useTranslation(['auth', 'common']);
  const form = Form.useFormInstance<BaptismInfoFormData>();

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      onSumbit();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Fragment>
      <Title level={2} className={baseStyles.title}>
        {t('auth.baptism_info.title')}
      </Title>

      <div className={classNames(baseStyles.fadeItem, baseStyles.delay1)}>
        <Form.Item
          name='baptismDate'
          label={
            <Text strong>
              {t('auth.baptism_info.baptism_date_label')}
              <Text type='secondary'> ({t('common:optional')})</Text>
            </Text>
          }
          className={styles.formItem}
          layout='vertical'
          getValueProps={(value) => ({value: value ? dayjs(value) : undefined})}
        >
          <DatePicker
            size='large'
            placeholder={t('auth.baptism_info.baptism_date_placeholder')}
            prefix={<CalendarOutlined />}
            format='DD.MM.YYYY'
            className={styles.datePicker}
          />
        </Form.Item>
      </div>

      <div className={classNames(baseStyles.fadeItem, baseStyles.delay2)}>
        <Form.Item
          name='childrenCount'
          label={
            <Text strong>
              {t('auth.baptism_info.children_label')}
              <Text type='secondary'> ({t('common:optional')})</Text>
            </Text>
          }
          rules={[
            {
              pattern: /^\d+$/,
              message: t('auth.baptism_info.children_invalid'),
            },
          ]}
          className={styles.formItem}
          layout='vertical'
        >
          <Input
            size='large'
            type='number'
            placeholder={t('auth.baptism_info.children_placeholder')}
            prefix={<TeamOutlined />}
          />
        </Form.Item>
      </div>

      <div className={classNames(baseStyles.fadeItem, baseStyles.delay3)}>
        <Form.Item
          name='maritalStatus'
          label={
            <Text strong>
              {t('auth.baptism_info.marital_status_label')}
              <Text type='secondary'> ({t('common:optional')})</Text>
            </Text>
          }
          className={styles.formItem}
          layout='vertical'
        >
          <Select
            size='large'
            placeholder={t('auth.baptism_info.marital_status_placeholder')}
          >
            <Option value='single'>
              {t('auth.baptism_info.marital_status_single')}
            </Option>
            <Option value='married'>
              {t('auth.baptism_info.marital_status_married')}
            </Option>
            <Option value='divorced'>
              {t('auth.baptism_info.marital_status_divorced')}
            </Option>
            <Option value='widowed'>
              {t('auth.baptism_info.marital_status_widowed')}
            </Option>
          </Select>
        </Form.Item>
      </div>

      <div className={classNames(baseStyles.fadeItem, baseStyles.delay4)}>
        <Form.Item
          name='city'
          label={
            <Text strong>
              {t('auth.baptism_info.city_label')}
              <Text type='secondary'> ({t('common:optional')})</Text>
            </Text>
          }
          rules={[{max: 100, message: t('auth.baptism_info.city_max_length')}]}
          className={styles.formItem}
          layout='vertical'
        >
          <Input
            size='large'
            placeholder={t('auth.baptism_info.city_placeholder')}
            prefix={<EnvironmentOutlined />}
          />
        </Form.Item>
      </div>

      <Flex
        gap={12}
        className={classNames(baseStyles.fadeItem, baseStyles.delay5)}
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
