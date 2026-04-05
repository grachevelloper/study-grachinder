export interface User {
    id: number;
    name: string;
    email?: string;
    gender: string;
    age: number;
    bio?: string;
    avatar_urls: string[];
    baptism_date?: string | null;
    children_count: number;
    marriages_count?: number;
    city_id?: number;
    city?: string;
    telegram?: string;
    phone?: string | null;
    interest_ids?: number[];
    interests?: string[];
    slavic_zodiac?: string;
    marital_status?: string;
}

export type UserFormData = Omit<User, 'id'>

export interface UserResponse extends User {
    created_at?: string;
    updated_at?: string;
}