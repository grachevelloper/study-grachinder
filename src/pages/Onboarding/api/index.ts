import {useMutation} from '@tanstack/react-query';

import type {UserResponse} from '~shared/typings/user';

import {SHARED_KEYS} from '~shared/api';
import {query, queryClient} from '~shared/config/api';

interface MainInfoPayload {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
}

interface BaptismInfoPayload {
    baptismDate?: string;
    marital_status?: 'single' | 'married' | 'divorced' | 'widowed';
    children_count?: number;
    city_id?: number;
}

interface InterestsPayload {
    interest_ids: number[];
}

interface BioPayload {
    bio: string;
}

interface ContactsPayload {
    telegram?: string;
    phone?: string;
    email?: string;
}

export const onboardingApi = {
    updateMainInfo: (data: MainInfoPayload) =>
        query.patch<UserResponse>('/user/onboarding/main', data),

    uploadPhoto: (file: File) => {
        const formData = new FormData();
        formData.append('photo', file);
        return query.post<{url: string}>('/user/onboarding/photo', formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
    },

    uploadFiles: (files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));
        return query.patch<void>('/user/onboarding/files', formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
    },

    updateBaptismInfo: (data: BaptismInfoPayload) =>
        query.patch<UserResponse>('/user/onboarding/baptism', data),

    updateInterests: (data: InterestsPayload) =>
        query.patch<UserResponse>('/user/onboarding/interests', data),

    updateBio: (data: BioPayload) =>
        query.patch<UserResponse>('/user/onboarding/bio', data),

    updateContacts: (data: ContactsPayload) =>
        query.patch<UserResponse>('/user/onboarding/contacts', data),

    finishOnboarding: () =>
        query.post<void>('/user/onboarding/finish'),
};

const invalidateMe = () =>
    queryClient.invalidateQueries({queryKey: SHARED_KEYS.me});

export const useUpdateMainInfo = () =>
    useMutation({
        mutationFn: onboardingApi.updateMainInfo,
        onSuccess: invalidateMe,
    });

export const useUploadPhoto = () =>
    useMutation({
        mutationFn: onboardingApi.uploadPhoto,
        onSuccess: invalidateMe,
    });

export const useUploadFiles = () =>
    useMutation({
        mutationFn: onboardingApi.uploadFiles,
        onSuccess: invalidateMe,
    });

export const useUpdateBaptismInfo = () =>
    useMutation({
        mutationFn: onboardingApi.updateBaptismInfo,
        onSuccess: invalidateMe,
    });

export const useUpdateInterests = () =>
    useMutation({
        mutationFn: onboardingApi.updateInterests,
        onSuccess: invalidateMe,
    });

export const useUpdateBio = () =>
    useMutation({
        mutationFn: onboardingApi.updateBio,
        onSuccess: invalidateMe,
    });

export const useUpdateContacts = () =>
    useMutation({
        mutationFn: onboardingApi.updateContacts,
        onSuccess: invalidateMe,
    });

export const useFinishOnboarding = () =>
    useMutation({
        mutationFn: onboardingApi.finishOnboarding,
        onSuccess: invalidateMe,
    });
