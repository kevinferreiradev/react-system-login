import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: {children: JSX.Element }) => {

    

    return (
        <AuthContext.Provider value={{ user, signin, singout }}>
            {children}
        </AuthContext.Provider>
    );
}