import {useQuery} from '@tanstack/react-query';

import type {City} from '~shared/typings/city';
import type {Interest} from '~shared/typings/interest';
import type {UserResponse} from '~shared/typings/user';

import {query, queryClient} from '~shared/config/api';

export const sharedApi = {
    getMe: () =>
        query.get<UserResponse>('/user/me'),

    getInterests: () =>
        query.get<Interest[]>('/interest'),

    getCities: (search?: string) =>
        query.get<City[]>('/city', {params: {search}}),
};

export const SHARED_KEYS = {
    me: ['me'] as const,
    interests: ['interests'] as const,
    cities: (search?: string) => ['cities', search] as const,
};

export const useGetMe = () =>
    useQuery({
        queryKey: SHARED_KEYS.me,
        queryFn: sharedApi.getMe,
    });

export const useInterests = () =>
    useQuery({
        queryKey: SHARED_KEYS.interests,
        queryFn: sharedApi.getInterests,
        staleTime: Infinity,
        select: (data) =>
            Object.fromEntries(data.map((i) => [i.id, i.name])) as Record<number, string>,
    });

export const useCities = (search?: string) =>
    useQuery({
        queryKey: SHARED_KEYS.cities(search),
        queryFn: () => sharedApi.getCities(search),
        select: (data) =>
            Object.fromEntries(data.map((c) => [c.id, c.name])) as Record<number, string>,
    });

export {queryClient};
