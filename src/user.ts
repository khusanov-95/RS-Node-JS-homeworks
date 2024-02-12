import { v4 as uuidv4 } from 'uuid';

export interface User {
    username: string;
    age: number;
    hobbies: string[];
    id?: string;
}

let users: User[] = [];

export const createUser = (user: User): User => {
    const newUser = { ...user, id: uuidv4() };
    users.push(newUser);
    return newUser;
};

export const getAllUsers = (): User[] => {
    return users;
};

export const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
};

export const updateUser = (id: string, updatedUser: User): User | undefined => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index] = { ...updatedUser, id };
        return users[index];
    }
    return undefined;
};

export const deleteUser = (id: string): boolean => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        return true;
    }
    return false;
};