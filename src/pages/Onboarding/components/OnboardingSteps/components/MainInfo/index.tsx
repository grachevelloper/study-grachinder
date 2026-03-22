import {Typography, Input, Button, Select, Upload, Form, Image} from 'antd';
import {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {
  UserOutlined,
  CalendarOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';

import styles from './main-info.module.css';
import baseStyles from '../../onboarding-steps.module.css';

const {Title, Text} = Typography;
const {Option} = Select;

interface MainInfoProps {
  onSumbit: () => void;
  loading: boolean;
}

interface MainInfoFormData {
  name: string;
  age?: string;
  gender: 'male' | 'female' | 'other';
  photo: {
    file: File;
    fileList: File[];
  };
}

export const MainInfo = ({onSumbit, loading}: MainInfoProps) => {
  const {t} = useTranslation(['auth', 'common']);
  const form = Form.useFormInstance<MainInfoFormData>();

  const handlePhotoUpload = (file: File) => {
    form.setFieldsValue({
      photo: {
        file,
        fileList: [file],
      },
    });
    return false;
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      onSumbit();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const photoValue = Form.useWatch('photo', form);

  return (
    <Fragment>
      <Title level={2} className={baseStyles.title}>
        {t('auth.main_info.title')}
      </Title>

      <div className={classNames(baseStyles.fadeItem, baseStyles.delay1)}>
        <Form.Item
          name='name'
          label={<Text strong>{t('auth.main_info.name_label')}</Text>}
          rules={[
            {required: true, message: t('auth.main_info.name_required')},
            {min: 2, message: t('auth.main_info.name_min_length')},
            {max: 50, message: t('auth.main_info.name_max_length')},
          ]}
          className={styles.formItem}
          layout='vertical'
        >
          <Input
            size='large'
            placeholder={t('auth.main_info.name_placeholder')}
            prefix={<UserOutlined />}
          />
        </Form.Item>
      </div>

      <div className={classNames(baseStyles.fadeItem, baseStyles.delay2)}>
        <Form.Item
          name='age'
          label={
            <Text strong>
              {t('auth.main_info.age_label')}
              <Text type='secondary'> ({t('common:optional')})</Text>
            </Text>
          }
          rules={[
            {pattern: /^\d+$/, message: t('auth.main_info.age_invalid')},
            {
              type: 'number',
              transform: Number,
              min: 18,
              max: 100,
              message: t('auth.main_info.age_range'),
            },
          ]}
          className={styles.formItem}
          getValueFromEvent={(e) => e.target.value}
          layout='vertical'
        >
          <Input
            size='large'
            type='number'
            placeholder={t('auth.main_info.age_placeholder')}
            prefix={<CalendarOutlined />}
          />
        </Form.Item>
      </div>

      <div className={classNames(baseStyles.fadeItem, baseStyles.delay3)}>
        <Form.Item
          name='gender'
          label={<Text strong>{t('auth.main_info.gender_label')}</Text>}
          rules={[
            {required: true, message: t('auth.main_info.gender_required')},
          ]}
          className={styles.formItem}
          layout='vertical'
        >
          <Select
            size='large'
            placeholder={t('auth.main_info.gender_placeholder')}
          >
            <Option value='male'>{t('auth.main_info.gender_male')}</Option>
            <Option value='female'>{t('auth.main_info.gender_female')}</Option>
            <Option value='other'>{t('auth.main_info.gender_other')}</Option>
          </Select>
        </Form.Item>
      </div>

      <div className={classNames(baseStyles.fadeItem, baseStyles.delay4)}>
        <Form.Item
          name='photo'
          label={<Text strong>{t('auth.main_info.photo_label')}</Text>}
          rules={[
            {required: true, message: t('auth.main_info.photo_required')},
          ]}
          className={styles.formItem}
          getValueFromEvent={(e) => e?.file}
          layout='vertical'
        >
          <Upload
            listType='picture-card'
            showUploadList={true}
            beforeUpload={handlePhotoUpload}
            className={styles.uploader}
            accept='image/*'
            multiple
          >
            {form.getFieldValue('photo')?.file ? (
              <Image
                src={URL.createObjectURL(form.getFieldValue('photo').file)}
                alt='avatar'
                width='100%'
                height='100%'
                style={{objectFit: 'cover'}}
              />
            ) : (
              <div>
                <CameraOutlined />
                <div style={{marginTop: 8}}>{t('auth.main_info.upload')}</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </div>

      <Button
        type='primary'
        size='large'
        block
        color='primary'
        variant='filled'
        className={classNames(baseStyles.fadeItem, baseStyles.delay5)}
        onClick={handleSubmit}
        loading={loading}
      >
        {t('common:continue')}
      </Button>
    </Fragment>
  );
};
