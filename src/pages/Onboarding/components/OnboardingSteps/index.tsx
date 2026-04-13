import {Flex, Form} from 'antd';
import dayjs from 'dayjs';
import {useCallback, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

import {useFinishOnboarding, useUpdateOnboarding, useUploadFiles} from '../../api';
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
  const photoFilesRef = useRef<File[]>([]);
  const [stepCount, setStep] = useLocalStorage<number>(
    ONBOARDING_STEP_COUNT_KEY,
    0
  );

  useEffect(() => {
    form.setFieldsValue({
      ...user,
      interests: user.interest_ids, // map stored interest_ids → interests form field
    });
  }, []);

  const navigate = useNavigate();
  const {mutate: updateOnboarding, isPending: isUpdating} = useUpdateOnboarding();
  const {mutate: uploadFiles, isPending: isUploading} = useUploadFiles();
  const {mutate: finishOnboarding, isPending: isFinishing} = useFinishOnboarding();

  const handleValuesChange = (changedValues: unknown, allValues: unknown) => {
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
      photoFilesRef.current = files;
      // Use object URLs (tiny strings) instead of data URLs (megabytes)
      const urls = files.map((file) => URL.createObjectURL(file));
      updateUser({...cleanRest, avatar_urls: urls} as Parameters<typeof updateUser>[0]);
    } else {
      updateUser(cleanRest as Parameters<typeof updateUser>[0]);
    }
  };

  const saveAllFields = useCallback(() => {
    const {photo: _p, ...allValues} = form.getFieldsValue(true);
    const toSave = Object.fromEntries(
      Object.entries(allValues).filter(([, v]) => v !== undefined)
    );
    updateUser(toSave as Parameters<typeof updateUser>[0]);
  }, [form, updateUser]);

  const handleNextStep = () => {
    if (stepCount !== 5) {
      saveAllFields();
      setStep((prev) => prev + 1);
      AuthEmitter.emit(AUTH_EVENT, stepCount + 1);
    } else {
      const stored = user as any;
      const payload = {
        first_name: stored.name || undefined,
        last_name: stored.last_name || undefined,
        birthDate: stored.birthDate ? dayjs(stored.birthDate).format('YYYY-MM-DD') : undefined,
        gender: stored.gender,
        baptismDate: stored.baptismDate ? dayjs(stored.baptismDate).format('YYYY-MM-DD') : undefined,
        childrenCount: stored.children_count !== undefined ? Number(stored.children_count) : undefined,
        maritalStatus: stored.maritalStatus,
        cityId: stored.city_id,
        interestsId: stored.interest_ids,
        bio: stored.bio,
        telegram: stored.telegram,
        phone: stored.phone,
        email: stored.email,
      };
      const files = photoFilesRef.current;

      const doFinish = () => {
        finishOnboarding(undefined, {
          onSuccess: () => {
            localStorage.removeItem(ONBOARDING_USER_KEY);
            localStorage.removeItem(ONBOARDING_STEP_COUNT_KEY);
            navigate('/auth/signin');
          },
        });
      };

      updateOnboarding(payload, {
        onSuccess: () => {
          if (files.length > 0) {
            uploadFiles(files, {onSuccess: doFinish});
          } else {
            doFinish();
          }
        },
      });
    }
  };

  const handlePrevStep = () => {
    saveAllFields();
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
            loading={isUpdating || isUploading || isFinishing}
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
        gap='10px'
        justify='center'
        align='center'
        className={styles.form}
      >
        {renderFormField()}
      </Flex>
    </Form>
  );
};
