import {useMutation} from '@tanstack/react-query';

import type {UserResponse} from '~shared/typings/user';

import {query, queryClient} from '~shared/config/api';

interface SignInPayload {
    email: string;
    password: string;
}

interface RegisterPayload {
    email: string;
    password: string;
}

export const signInApi = {
    signIn: (data: SignInPayload) =>
        query.post<UserResponse>('/auth/signin', data),

    register: (data: RegisterPayload) =>
        query.post<UserResponse>('/auth/register', data),

    signOut: () =>
        query.post('/auth/signout'),
};

export const useSignIn = () =>
    useMutation({
        mutationFn: signInApi.signIn,
    });

export const useRegister = () =>
    useMutation({
        mutationFn: signInApi.register,
    });

export const useSignOut = () =>
    useMutation({
        mutationFn: signInApi.signOut,
        onSuccess: () => {
            queryClient.clear();
        },
    });
