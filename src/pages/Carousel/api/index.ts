import { useMutation, useQuery } from '@tanstack/react-query';

import type { Match } from '~shared/typings/match';
import type { User } from '~shared/typings/user';

import { query, queryClient } from '~shared/config/api';

const mapFeedUser = (raw: any): User => ({
    id: raw.id,
    name: raw.username ?? raw.name,
    age: raw.age,
    gender: raw.gender?.toLowerCase() ?? raw.gender,
    bio: raw.about ?? raw.bio,
    avatar_urls: raw.photos ?? raw.avatar_urls ?? [],
    children_count: raw.childrenCount ?? raw.children_count ?? 0,
    city: raw.city,
    city_id: raw.city_id,
    telegram: raw.telegram,
    phone: raw.phone,
    email: raw.email,
    interests: raw.interests,
    interest_ids: raw.interest_ids,
    slavic_zodiac: raw.slavicZodiac,
    marital_status: raw.maritalStatus ?? raw.marital_status,
});

export const carouselApi = {
    getFeed: () =>
        query.get<any[]>('/user').then((data) => data.map(mapFeedUser)),

    likeUser: (userId: number) =>
        query.post<Match>(`/match/match/${userId}`),

    passUser: (userId: number) =>
        query.post<void>(`/match/dismatch/${userId}`),
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
