export interface UserLoginData {
    id?: string,
    isLogged: boolean,
    token?: string,
    userName?: string,
    profilePictureUrl?: string,
    initialSetup: boolean,
    location?: string,
}

export type InitialStateType = {
    user: UserLoginData
}

export interface Props {
    children: React.ReactNode
}

export type LoginContextType = {
    user: UserLoginData,
    saveUser: (user: UserLoginData) => void,
    // updateUser: (id: string) => void
}

export enum LoginTypes {
    Update = 'UPDATE_USER',
}

export type ActionMap<M extends { [index: string]: any}> = {
    [Key in keyof M]: M[Key] extends undefined
        ?
    {
        type: Key;
    }
        :
    {
        type: Key;
        payload: M[Key];
    }
};

export type LoginPayload = {
    [LoginTypes.Update] : UserLoginData
}

export type LoginActions = ActionMap<LoginPayload>[keyof ActionMap<LoginPayload>];