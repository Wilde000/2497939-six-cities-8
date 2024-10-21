import {UserType} from './user-type.js';

export type User = {
    username: string;
    email: string;
    avatarUrl: string;
    password: string;
    type: UserType;
}