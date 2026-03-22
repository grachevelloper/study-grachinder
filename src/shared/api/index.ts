import {useQuery} from '@tanstack/react-query';

import type {City} from '~shared/typings/city';
import type {Interest} from '~shared/typings/interest';

import {query, queryClient} from '~shared/config/api';

export const sharedApi = {
    getInterests: () =>
        query.get<Interest[]>('/interests'),

    getCities: (search?: string) =>
        query.get<City[]>('/cities', {params: {search}}),
};

export const SHARED_KEYS = {
    interests: ['interests'] as const,
    cities: (search?: string) => ['cities', search] as const,
};

export const useInterests = () =>
    useQuery({
        queryKey: SHARED_KEYS.interests,
        queryFn: sharedApi.getInterests,
        staleTime: Infinity,
    });

export const useCities = (search?: string) =>
    useQuery({
        queryKey: SHARED_KEYS.cities(search),
        queryFn: () => sharedApi.getCities(search),
    });

export {queryClient};
