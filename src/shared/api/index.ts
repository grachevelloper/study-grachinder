import {useQuery} from '@tanstack/react-query';

import type {City} from '~shared/typings/city';
import type {Interest} from '~shared/typings/interest';
import type {UserResponse} from '~shared/typings/user';

import {query, queryClient} from '~shared/config/api';

const calcAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
    return age;
};

const mapPhotos = (raw: any): string[] => {
    const src = raw.photos ?? raw.avatarUrls ?? raw.avatar_urls ?? [];
    return src
        .map((p: any) => {
            const str = typeof p === 'string' ? p : (p.url ?? p.path ?? '');
            // Server may return JSON-encoded strings: "\"https://...\"" → strip outer quotes
            return str.replace(/^"(.*)"$/, '$1');
        })
        .filter(Boolean);
};

const mapUser = (raw: any): UserResponse => ({
    id: raw.id,
    name: raw.username ?? raw.firstName ?? raw.first_name ?? raw.name,
    email: raw.email,
    gender: raw.gender ? raw.gender.toLowerCase() : raw.gender,
    age: raw.age ?? (raw.birthDate ? calcAge(raw.birthDate) : raw.birth_date ? calcAge(raw.birth_date) : undefined),
    bio: raw.about ?? raw.bio,
    avatar_urls: mapPhotos(raw),
    baptism_date: raw.baptismDate ?? raw.baptism_date,
    children_count: raw.childrenCount ?? raw.children_count ?? 0,
    city_id: raw.cityId ?? raw.city_id,
    city: raw.cityName ?? raw.city,
    telegram: raw.telegram,
    phone: raw.phone,
    interest_ids: raw.interestIds ?? raw.interestsId ?? raw.interest_ids,
    interests: raw.interests,
    slavic_zodiac: raw.slavicZodiac ?? raw.slavic_zodiac,
    marital_status: raw.maritalStatus ?? raw.marital_status,
});

export const sharedApi = {
    getMe: () =>
        query.get<any>('/user/me').then(mapUser),

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
