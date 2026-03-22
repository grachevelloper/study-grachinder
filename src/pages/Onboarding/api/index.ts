import {useMutation, useQuery} from '@tanstack/react-query';

import type {UserResponse} from '~shared/typings/user';

import {query, queryClient} from '~shared/config/api';

// Step 1 payload (Register) is handled by signInApi.register

interface MainInfoPayload {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
}

interface BaptismInfoPayload {
    baptismDate?: string; // ISO 8601
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
    getMe: () =>
        query.get<UserResponse>('/users/me'),

    updateMainInfo: (data: MainInfoPayload) =>
        query.patch<UserResponse>('/onboarding/main', data),

    uploadPhoto: (file: File) => {
        const formData = new FormData();
        formData.append('photo', file);
        return query.post<{url: string}>('/onboarding/photo', formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
    },

    updateBaptismInfo: (data: BaptismInfoPayload) =>
        query.patch<UserResponse>('/onboarding/baptism', data),

    updateInterests: (data: InterestsPayload) =>
        query.patch<UserResponse>('/onboarding/interests', data),

    updateBio: (data: BioPayload) =>
        query.patch<UserResponse>('/onboarding/bio', data),

    updateContacts: (data: ContactsPayload) =>
        query.patch<UserResponse>('/onboarding/contacts', data),
};

export const ONBOARDING_KEYS = {
    me: ['me'] as const,
};

const invalidateMe = () =>
    queryClient.invalidateQueries({queryKey: ONBOARDING_KEYS.me});

export const useGetMe = () =>
    useQuery({
        queryKey: ONBOARDING_KEYS.me,
        queryFn: onboardingApi.getMe,
    });

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
