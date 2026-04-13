import type { User } from './user';

export interface Match {
    id: number;
    user: User;
    otherUser: User;
    status: 'ACCEPTED' | 'PENDING' | 'REJECTED';
}
