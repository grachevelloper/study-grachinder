import {Typography, Button, Form, Flex} from 'antd';
import classNames from 'classnames';
import {Fragment, useState} from 'react';
import {useTranslation} from 'react-i18next';


import baseStyles from '../../onboarding-steps.module.css';

import styles from './interests-info.module.css';

import {InterestTag} from '~components/InterestTag';
import {useUserStorage} from '~pages/Onboarding/hooks/useUserStorage';
import {useInterests} from '~shared/api';

const {Title, Text} = Typography;

interface InterestsInfoProps {
  onSumbit: () => void;
  onBack: () => void;
  loading: boolean;
}

interface InterestsInfoFormData {
  interests: number[];
}

export const InterestsInfo = ({
  onSumbit,
  onBack,
  loading,
}: InterestsInfoProps) => {
  const {t} = useTranslation(['auth', 'common']);
  const form = Form.useFormInstance<InterestsInfoFormData>();
  const {user, updateUser} = useUserStorage();
  const {data: interestsMap = {}} = useInterests();
  const [selectedInterests, setSelectedInterests] = useState<number[]>(
    user.interest_ids ?? []
  );

  const handleInterestClick = (id: number) => {
    const newSelected = selectedInterests.includes(id)
      ? selectedInterests.filter((i) => i !== id)
      : [...selectedInterests, id];

    setSelectedInterests(newSelected);
    form.setFieldsValue({interests: newSelected});
    updateUser({interest_ids: newSelected});
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
        {Object.entries(interestsMap).map(([id, name]) => (
          <InterestTag
            key={id}
            name={name}
            className={classNames(styles.interestTag, {
              [styles.selected]: selectedInterests.includes(Number(id)),
            })}
            onClick={() => handleInterestClick(Number(id))}
          />
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
