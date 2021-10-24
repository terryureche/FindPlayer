export type PlayerQualities = {
    legs: string,
    position: number[],
    description: string | null,
    age: number | null,
    team: string | null
}

export interface UserLoginData {
    id?: string,
    isLogged: boolean,
    token?: string,
    userName?: string,
    profilePictureUrl?: string,
    initialSetup: boolean,
    location: string
    playerQualities: PlayerQualities
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
    UpdateLogin = 'UPDATE_USER_LOGIN',
    UpdateQualities = 'UPDATE_USER_QUALITIES',
    UpdateLocation = 'UPDATE_USER_LOCATION',
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
    [LoginTypes.UpdateLogin] : UserLoginData,
    [LoginTypes.UpdateQualities]: UserLoginData,
    [LoginTypes.UpdateLocation]: UserLoginData
}

export type LoginActions = ActionMap<LoginPayload>[keyof ActionMap<LoginPayload>];