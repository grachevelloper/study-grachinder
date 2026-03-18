export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    gender: 'male' | 'female' | 'other';
    birth_date: string;
    bio: string;
    avatar_url: string;
    baptism_date?: string | null;
    children_count: number;
    marriages_count: number;
    city_id: number;
    telegram: string;
    phone?: string | null;
    interests: string[]
}

export interface UserFormData extends Omit<User, 'id'> {
}


export interface UserResponse extends User {
    created_at?: string;
    updated_at?: string;
}