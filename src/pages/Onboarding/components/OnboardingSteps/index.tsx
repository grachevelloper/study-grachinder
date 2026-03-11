import {Flex, Form} from 'antd';
import {useCallback} from 'react';
import {useLocalStorage} from '~shared/hooks/useLocalStorage';
import {MainInfo} from './components/MainInfo';
import {ONBOARDING_STEP_COUNT_KEY} from '~shared/constants';

import styles from './onboarding-steps.module.css';

export const OnboadringSteps = () => {
  const [form] = Form.useForm<any>();
  const [stepCount, setStepCount] = useLocalStorage<number>(
    ONBOARDING_STEP_COUNT_KEY,
    0
  );

  const renderFormField = useCallback(() => {
    switch (stepCount) {
      case 0: {
        return (
          <MainInfo
            onSumbit={() => setStepCount((prev) => prev + 1)}
            loading={false}
          />
        );
      }
      case 1: {
        return (
          <MainInfo
            onSumbit={() => setStepCount((prev) => prev + 1)}
            loading={false}
          />
        );
      }
    }
  }, []);
  return (
    <Form
      variant='filled'
      scrollToFirstError
      className={styles.form_wrapper}
      form={form}
    >
      <Flex
        vertical
        gap='18px'
        justify='center'
        align='center'
        className={styles.form}
      >
        {renderFormField()}
      </Flex>
    </Form>
  );
};
