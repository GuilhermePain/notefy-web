export interface IToken {
    sub: string;
    name: string;
    iat: number;
    exp: number;
}

export interface INote {
    id: string;
    title: string;
    createdAt: string;
    body: string;
}