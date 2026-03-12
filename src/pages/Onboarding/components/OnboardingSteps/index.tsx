import {Flex, Form} from 'antd';
import {useCallback, useEffect} from 'react';
import {useLocalStorage} from '~shared/hooks/useLocalStorage';
import {Register} from './components/Register';
import {ONBOARDING_STEP_COUNT_KEY} from '~shared/constants';

import styles from './onboarding-steps.module.css';
import {MainInfo} from './components/MainInfo';
import {AUTH_EVENT, AuthEmitter} from '~shared/events/auth';

export const OnboadringSteps = () => {
  const [form] = Form.useForm<any>();
  const [stepCount, setStepCount] = useLocalStorage<number>(
    ONBOARDING_STEP_COUNT_KEY,
    0
  );

  const handleNextStep = () => {
    setStepCount((prev) => prev + 1);
    AuthEmitter.emit(AUTH_EVENT, stepCount + 1);
  };

  useEffect(() => {
    const handleSignStepChange = (newStep: number) => {
      if (newStep !== stepCount) {
        setStepCount(newStep);
      }
    };
    AuthEmitter.on(AUTH_EVENT, handleSignStepChange);

    return () => {
      AuthEmitter.off(AUTH_EVENT, handleSignStepChange);
    };
  }, [setStepCount, AuthEmitter]);

  const renderFormField = useCallback(() => {
    switch (stepCount) {
      case 0: {
        return <Register onSumbit={handleNextStep} loading={false} />;
      }
      case 1: {
        return <MainInfo onSumbit={handleNextStep} loading={false} />;
      }
    }
  }, [stepCount, handleNextStep]);
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
