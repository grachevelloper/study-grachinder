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
            // avatar_urls can be blob URLs or large data URLs — keep in memory only
            const { avatar_urls: _skip, ...storableUser } = newUser as any;
            try {
                localStorage.setItem(ONBOARDNING_USER, JSON.stringify(storableUser));
            } catch {
                // quota exceeded — keep in memory only
            }
            // defer emit to avoid "setState during render" React warning
            queueMicrotask(() => UserEmitter.emit(USER_EVENT.UPDATE, newUser));
            return newUser;
        });
    }, []);

    useEffect(() => {
        const handleUpdate = (updatedUser: User) => {
            setUser(updatedUser);
        };

        UserEmitter.on(USER_EVENT.UPDATE, handleUpdate);

        return () => {
            UserEmitter.off(USER_EVENT.UPDATE, handleUpdate);
        };
    }, []);

    return { user, updateUser };
};