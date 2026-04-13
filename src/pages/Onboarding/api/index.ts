import {useMutation} from '@tanstack/react-query';

import type {UserResponse} from '~shared/typings/user';

import {SHARED_KEYS} from '~shared/api';
import {query, queryClient} from '~shared/config/api';

export interface OnboardingPayload {
    first_name?: string;
    last_name?: string;
    birthDate?: string;
    gender?: string;
    baptismDate?: string;
    childrenCount?: number;
    maritalStatus?: string;
    cityId?: number;
    interestsId?: number[];
    bio?: string;
    telegram?: string;
    phone?: string;
    email?: string;
}

export const onboardingApi = {
    updateOnboarding: (data: OnboardingPayload) =>
        query.patch<UserResponse>('/user/onboarding', data),

    uploadFiles: (files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));
        return query.patch<void>('/user/onboarding/files', formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
    },

    finishOnboarding: () =>
        query.post<void>('/user/onboarding/finish'),
};

const invalidateMe = () =>
    queryClient.invalidateQueries({queryKey: SHARED_KEYS.me});

export const useUpdateOnboarding = () =>
    useMutation({
        mutationFn: onboardingApi.updateOnboarding,
        onSuccess: invalidateMe,
    });

export const useUploadFiles = () =>
    useMutation({
        mutationFn: onboardingApi.uploadFiles,
        onSuccess: invalidateMe,
    });

export const useFinishOnboarding = () =>
    useMutation({
        mutationFn: onboardingApi.finishOnboarding,
        onSuccess: invalidateMe,
    });

export const useUpdateBio = () =>
    useMutation({
        mutationFn: (data: {bio?: string}) =>
            onboardingApi.updateOnboarding({bio: data.bio}),
        onSuccess: invalidateMe,
    });

export const useUpdateMainInfo = () =>
    useMutation({
        mutationFn: (data: {name?: string; age?: number; gender?: string}) =>
            onboardingApi.updateOnboarding({
                first_name: data.name,
                gender: data.gender?.toUpperCase(),
            }),
        onSuccess: invalidateMe,
    });

export const useUpdateBaptismInfo = () =>
    useMutation({
        mutationFn: (data: {baptismDate?: string; children_count?: number; city_id?: number}) =>
            onboardingApi.updateOnboarding({
                baptismDate: data.baptismDate,
                childrenCount: data.children_count,
                cityId: data.city_id,
            }),
        onSuccess: invalidateMe,
    });

export const useUpdateContacts = () =>
    useMutation({
        mutationFn: (data: {telegram?: string; email?: string; phone?: string}) =>
            onboardingApi.updateOnboarding({
                telegram: data.telegram,
                email: data.email,
                phone: data.phone,
            }),
        onSuccess: invalidateMe,
    });

export const useUpdateInterests = () =>
    useMutation({
        mutationFn: (data: {interest_ids?: number[]}) =>
            onboardingApi.updateOnboarding({interestsId: data.interest_ids}),
        onSuccess: invalidateMe,
    });

export const useUploadPhoto = () =>
    useMutation({
        mutationFn: (file: File) => onboardingApi.uploadFiles([file]),
        onSuccess: invalidateMe,
    });
