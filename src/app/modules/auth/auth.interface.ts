export type TAccount = {
    email: string;
    number:string;
    password: string;
    lastPasswordChange?: Date;
    isDeleted?: boolean;
    status?: "ACTIVE" | "BLOCK";
    role?: "USER" | "ADMIN",
    isVerified?: boolean,
    
    isPlan?: boolean,
    planId?: string,
    planToken?: string
}


export interface TRegisterPayload extends TAccount {
    name: string
}

export type TLoginPayload = {
    email: string;
    password: string
}

export type TJwtUser = {
    email: string,
    role?: "USER" | "ADMIN",
}