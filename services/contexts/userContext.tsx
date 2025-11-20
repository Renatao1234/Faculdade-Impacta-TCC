import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface User{
    id: number;
    email: string;
    name: string;
    registration:number | undefined;
    type?: string;
}

interface UserContextType{
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
    loading: boolean;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    logout: () => {},
    loading: true,
});

export function UserProvider({ children } : { children: ReactNode }){
    const [user, setUserState] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        console.log("UserProvider state LALAL:", user);
    }, [user]);

    useEffect(() => {
        const loadUser = async () => {
            try{
                const savedUser = await AsyncStorage.getItem("user");
                if(savedUser) setUserState(JSON.parse(savedUser));
                console.log("savedUser: ", savedUser);
            } catch (error) {
                console.log("Erro ao carregar usuário: ", error);
            } finally {
                setLoading(false);
            }           
        };
        loadUser();
    },[]);

    const setUser = async (newUser: User | null) => {
        try {
            if(newUser) {
                console.log("newUser IF: ", newUser);
                await AsyncStorage.setItem("user", JSON.stringify(newUser));
            } else {
                console.log("newUser ELSE: ", newUser);
                await AsyncStorage.removeItem("user");
            }
            setUserState(newUser);
        } catch(error) {
            console.log("Erro ao salvar usuário: ", error);
        }
    };
  
    const logout = async () => {
        console.log("3");
        await AsyncStorage.removeItem("user");
        setUserState(null);
    };

    return (
        <UserContext.Provider value={{user, setUser, logout, loading}}>
            {loading ? null : children}
        </UserContext.Provider>
    )
}