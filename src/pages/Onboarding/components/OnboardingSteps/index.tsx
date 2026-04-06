import {Flex, Form} from 'antd';
import {useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {useFinishOnboarding} from '../../api';
import {useUserStorage} from '../../hooks/useUserStorage';

import {AboutInfo} from './components/AboutInfo';
import {BaptismInfo} from './components/BaptismInfo';
import {ContactsInfo} from './components/ContactsInfo';
import {InterestsInfo} from './components/InterestsInfo';
import {MainInfo} from './components/MainInfo';
import {Register} from './components/Register';

import styles from './onboarding-steps.module.css';

import {ONBOARDING_STEP_COUNT_KEY, ONBOARDING_USER_KEY} from '~shared/constants';
import {AUTH_EVENT, AuthEmitter} from '~shared/events/auth';
import {useAuthStepsListen} from '~shared/hooks/useAuthStepsListen';
import {useLocalStorage} from '~shared/hooks/useLocalStorage';

export const OnboadringSteps = () => {
  const [form] = Form.useForm();
  const {user, updateUser} = useUserStorage();
  const [stepCount, setStep] = useLocalStorage<number>(
    ONBOARDING_STEP_COUNT_KEY,
    0
  );

  useEffect(() => {
    form.setFieldsValue(user);
  }, []);

  const navigate = useNavigate();
  const {mutate: finishOnboarding, isPending: isFinishing} = useFinishOnboarding();

  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });

  const handleValuesChange = async (changedValues: unknown, allValues: unknown) => {
    const changed = changedValues as Record<string, unknown>;
    const values = allValues as Record<string, unknown>;
    const {photo: allPhoto, ...rest} = values;

    const cleanRest = Object.fromEntries(
      Object.entries(rest).filter(([, v]) => v !== undefined)
    );

    if ('photo' in changed) {
      const fileList = Array.isArray(allPhoto) ? allPhoto : allPhoto ? [allPhoto] : [];
      const files = fileList
        .filter((f: any) => f?.originFileObj)
        .map((f: any) => f.originFileObj as File);
      const urls = await Promise.all(files.map(fileToDataUrl));
      updateUser({...cleanRest, avatar_urls: urls} as Parameters<typeof updateUser>[0]);
    } else {
      updateUser(cleanRest as Parameters<typeof updateUser>[0]);
    }
  };

  const handleNextStep = () => {
    if (stepCount !== 5) {
      setStep((prev) => prev + 1);
      AuthEmitter.emit(AUTH_EVENT, stepCount + 1);
    } else {
      finishOnboarding(undefined, {
        onSuccess: () => {
          localStorage.removeItem(ONBOARDING_USER_KEY);
          localStorage.removeItem(ONBOARDING_STEP_COUNT_KEY);
          navigate('/');
        },
      });
    }
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
        return (
          <MainInfo onSumbit={handleNextStep} loading={false} form={form} />
        );
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
            loading={isFinishing}
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
      onValuesChange={handleValuesChange}
      layout='vertical'
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
