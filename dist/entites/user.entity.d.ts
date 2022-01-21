import { Photo } from 'src/entites/photo.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    age: number;
    role: number;
    status: boolean;
    photos: Photo[];
}
