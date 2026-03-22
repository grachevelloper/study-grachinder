import { useMutation, useQuery } from '@tanstack/react-query';

import type { UserResponse } from '~shared/typings/user';

import { query, queryClient } from '~shared/config/api';

export const carouselApi = {
    getFeed: () =>
        query.get<UserResponse[]>('/feed'),

    likeUser: (userId: number) =>
        query.post(`/feed/${userId}/like`),

    passUser: (userId: number) =>
        query.post(`/feed/${userId}/pass`),
};

export const CAROUSEL_KEYS = {
    feed: ['feed'] as const,
};

const invalidateFeed = () =>
    queryClient.invalidateQueries({ queryKey: CAROUSEL_KEYS.feed });

export const useGetFeed = () =>
    useQuery({
        queryKey: CAROUSEL_KEYS.feed,
        queryFn: carouselApi.getFeed,
    });

export const useLikeUser = () =>
    useMutation({
        mutationFn: carouselApi.likeUser,
        onSuccess: invalidateFeed,
    });

export const usePassUser = () =>
    useMutation({
        mutationFn: carouselApi.passUser,
        onSuccess: invalidateFeed,
    });
