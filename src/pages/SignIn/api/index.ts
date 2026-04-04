import {useMutation} from '@tanstack/react-query';

import {query, queryClient, saveToken, removeToken} from '~shared/config/api';

interface AuthPayload {
    email: string;
    password: string;
}

interface AuthResponse {
    jwt: string;
}

export const signInApi = {
    signIn: (data: AuthPayload) =>
        query.post<AuthResponse>('/user/login', data),

    register: (data: AuthPayload) =>
        query.post<AuthResponse>('/user/register', data),

    signOut: () =>
        query.post('/user/logout'),
};

export const useSignIn = () =>
    useMutation({
        mutationFn: signInApi.signIn,
        onSuccess: ({jwt}) => saveToken(jwt),
    });

export const useRegister = () =>
    useMutation({
        mutationFn: signInApi.register,
        onSuccess: ({jwt}) => saveToken(jwt),
    });

export const useSignOut = () =>
    useMutation({
        mutationFn: signInApi.signOut,
        onSuccess: () => {
            removeToken();
            queryClient.clear();
        },
    });
