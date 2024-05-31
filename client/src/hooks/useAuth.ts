import { create } from "zustand";


interface IUser {
    name: string;
    email: string;
    id: string;
}

interface IAuthStore {
    user: null | IUser;
    setUser: (user: IUser | null) => void;
}

export const useAuth = create<IAuthStore>((set) => ({
    user: null,
    setUser: (user) => {
        set({ user })
    }
}))