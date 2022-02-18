import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: {children: JSX.Element }) => {

    const [user, setUser] = useState<User | null>(null);
    const api = useApi();

    useEffect(() => {
        const validadeToken = async () => {
            const storeData = localStorage.getItem('authToken');
            if(storeData) {
                const data = await api.validadeToken(storeData);
                if (data.user) {
                    setUser(data.user);
                }
            }
        }
        validadeToken();
    },[api]);

    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        if(data.user && data.token) {
            setUser(data.user);
            setToken(data.token);
            return true;
        }
        return false;
    }

    const signout = async () => {
        await api.logout();
        setUser(null);
        setToken('');
    }

     const setToken = (token: string) => {
         localStorage.setItem('authToken', token);
     }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}