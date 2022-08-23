
export  interface User {
    id: string,
    name: string,
    email: string,
    avatar: string,
    roles: Array<any>,
    permissions: Array<any>
}

export  interface Token {
    access_token: string,
    token_type: string,
    expires_in: string,
    exp: string,
    refresh_token: string
}