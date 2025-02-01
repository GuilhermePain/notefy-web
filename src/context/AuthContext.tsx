import { createContext, ReactNode, useContext } from "react";
import useToken from "../hooks/useToken";
import { IToken } from "../@types/types";

interface IAuthContext {
    isAuthenticated: boolean;
    token: IToken | null;
    logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

    const { isAuthenticated, decodedToken } = useToken();

    const logout = () => {
        document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: isAuthenticated(), token: decodedToken || null, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}