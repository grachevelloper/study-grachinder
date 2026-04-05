import { useState, useEffect, useCallback } from 'react';

import type { User } from '~shared/typings/user';

import { ONBOARDING_USER_KEY } from '~shared/constants';
import { UserEmitter, USER_EVENT } from '~shared/events/onboarding';

const ONBOARDNING_USER = ONBOARDING_USER_KEY;

export const useUserStorage = () => {
    const [user, setUser] = useState<User>(() => {
        const stored = localStorage.getItem(ONBOARDNING_USER);
        return stored ? JSON.parse(stored) : {};
    });


    const updateUser = useCallback((updates: Partial<User>) => {
        setUser(prev => {
            const newUser = { ...prev, ...updates };
            localStorage.setItem(ONBOARDNING_USER, JSON.stringify(newUser));
            UserEmitter.emit(USER_EVENT.UPDATE, newUser);
            return newUser;
        });
    }, []);


    useEffect(() => {
        const handleUpdate = (updatedUser: User) => {
            setUser(updatedUser);
            localStorage.setItem(ONBOARDNING_USER, JSON.stringify(updatedUser));
        };

        UserEmitter.on(USER_EVENT.UPDATE, handleUpdate);

        return () => {
            UserEmitter.off(USER_EVENT.UPDATE, handleUpdate);
        };
    }, []);

    return { user, updateUser };
};