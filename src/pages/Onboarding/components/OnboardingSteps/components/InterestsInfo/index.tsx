import {Typography, Button, Form, Flex, Tag} from 'antd';
import {Fragment, useState} from 'react';
import {useTranslation} from 'react-i18next';
import classNames from 'classnames';

import styles from './interests-info.module.css';
import baseStyles from '../../onboarding-steps.module.css';

const {Title, Text} = Typography;

interface InterestsInfoProps {
  onSumbit: () => void;
  onBack: () => void;
  loading: boolean;
}

interface InterestsInfoFormData {
  interests: string[];
}

const INTERESTS_LIST = [
  'interests.faith',
  'interests.nature',
  'interests.literature',
  'interests.music',
  'interests.crafts',
  'interests.cooking',
  'interests.travel',
  'interests.sport',
  'interests.family',
  'interests.animals',
  'interests.art',
  'interests.history',
  'interests.meditation',
  'interests.volunteering',
];

export const InterestsInfo = ({
  onSumbit,
  onBack,
  loading,
}: InterestsInfoProps) => {
  const {t} = useTranslation(['auth', 'common']);
  const form = Form.useFormInstance<InterestsInfoFormData>();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    form.getFieldValue('interests') || []
  );

  const handleInterestClick = (interest: string) => {
    const newSelected = selectedInterests.includes(interest)
      ? selectedInterests.filter((i) => i !== interest)
      : [...selectedInterests, interest];

    setSelectedInterests(newSelected);
    form.setFieldsValue({interests: newSelected});
  };

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
        {t('auth.interests.title')}
      </Title>

      <Text className={baseStyles.subtitle}>
        {t('auth.interests.subtitle')}
      </Text>

      <Form.Item
        name='interests'
        rules={[
          {required: true, message: t('auth.interests.interests_required')},
        ]}
        className={styles.hiddenFormItem}
      ></Form.Item>

      <div
        className={classNames(
          baseStyles.fadeItem,
          baseStyles.delay1,
          styles.interestsContainer
        )}
      >
        {INTERESTS_LIST.map((interest) => (
          <Tag
            key={interest}
            className={classNames(styles.interestTag, {
              [styles.selected]: selectedInterests.includes(interest),
            })}
            onClick={() => handleInterestClick(interest)}
          >
            {t(`auth.interests.${interest}`)}
          </Tag>
        ))}
      </div>

      <Flex
        gap={12}
        className={classNames(
          baseStyles.fadeItem,
          baseStyles.delay2,
          baseStyles.buttonContainer
        )}
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
          disabled={selectedInterests.length === 0}
        >
          {t('common:continue')}
        </Button>
      </Flex>
    </Fragment>
  );
};
