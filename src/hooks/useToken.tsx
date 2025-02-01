import Cookies from "js-cookie";
import { useJwt } from "react-jwt";
import { IToken } from "../@types/types";
import { useState } from "react";

const useToken = () => {
    const token = Cookies.get('token');
    const { decodedToken, isExpired } = useJwt<IToken>(token || "");
    const [userId, setUserId] = useState<string | null>(null);

    const isAuthenticated = (): boolean => {
        if(!token || isExpired) {
            return false;
        }

        return true;
    };

    return {
        userId,
        setUserId,
        decodedToken,
        isExpired,
        isAuthenticated
    }

}

export default useToken
