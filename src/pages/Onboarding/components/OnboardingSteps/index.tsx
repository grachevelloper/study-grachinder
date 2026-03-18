import {Flex, Form} from 'antd';
import {useCallback, useEffect} from 'react';
import {useLocalStorage} from '~shared/hooks/useLocalStorage';
import {Register} from './components/Register';
import {ONBOARDING_STEP_COUNT_KEY} from '~shared/constants';

import styles from './onboarding-steps.module.css';
import {MainInfo} from './components/MainInfo';
import {AUTH_EVENT, AuthEmitter} from '~shared/events/auth';
import {BaptismInfo} from './components/BaptismInfo';
import {InterestsInfo} from './components/InterestsInfo';
import {AboutInfo} from './components/AboutInfo';
import {ContactsInfo} from './components/ContactsInfo';
import {useAuthStepsListen} from '~shared/hooks/useAuthStepsListen';

export const OnboadringSteps = () => {
  const [form] = Form.useForm<any>();
  const [stepCount, setStep] = useLocalStorage<number>(
    ONBOARDING_STEP_COUNT_KEY,
    0
  );

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
    AuthEmitter.emit(AUTH_EVENT, stepCount + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
    AuthEmitter.emit(AUTH_EVENT, stepCount - 1);
  };
  const handleStepChange = (newStep: number) => {
    if (newStep !== stepCount) {
      setStep(newStep);
    }
  };

  useAuthStepsListen({onStepChange: handleStepChange, stepCount});

  const renderFormField = useCallback(() => {
    switch (stepCount) {
      case 0: {
        return <Register onSumbit={handleNextStep} loading={false} />;
      }
      case 1: {
        return <MainInfo onSumbit={handleNextStep} loading={false} />;
      }
      case 2: {
        return (
          <BaptismInfo
            onBack={handlePrevStep}
            onSumbit={handleNextStep}
            loading={false}
          />
        );
      }
      case 3: {
        return (
          <InterestsInfo
            onBack={handlePrevStep}
            onSumbit={handleNextStep}
            loading={false}
          />
        );
      }
      case 4: {
        return (
          <AboutInfo
            onBack={handlePrevStep}
            onSumbit={handleNextStep}
            loading={false}
          />
        );
      }
      case 5: {
        return (
          <ContactsInfo
            onBack={handlePrevStep}
            onSumbit={handleNextStep}
            loading={false}
          />
        );
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
