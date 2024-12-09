export interface IDecodedToken {
    sub: string;
    name: string;
    iat: number;
    exp: number;
}

export interface INote {
    id: string;
    title: string;
    body: string;
}