export  interface Permission {
    text: string,
    value: string
}

export interface UserInterface{
    id:string,
    avatar: string,
    name: string,
    role: string,
    permissions: String[]
}