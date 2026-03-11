import React, {createContext, useContext, useState, type Dispatch, type SetStateAction} from 'react';

import {type User} from '~shared/typings/user';

export interface UserContextType {
    user?: User;
    setUserData: Dispatch<SetStateAction<User | undefined>>;
}

export const UserVoid = {
    user: undefined,
    setUserData: () => {},
};

const AuthContext = createContext<UserContextType>(UserVoid);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
    children,
}) => {
    const [user, setUserData] = useState<User | undefined>();

    const value = {
        user,
        setUserData,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = (): UserContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};