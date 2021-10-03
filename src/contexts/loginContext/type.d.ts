interface UserLoginData {
    id: string,
    isLogged: boolean,
    token: string,
    userName: string,
    profilePictureUrl: string
}

type InitialStateType = {
    user: UserLoginData
}

interface Props {
    children: React.ReactNode
}

type LoginContextType = {
    user: UserLoginData,
    saveUser: (user: UserLoginData) => void,
    // updateUser: (id: string) => void
}

enum LoginTypes {
    Update = 'UPDATE_USER',
}

type ActionMap<M extends { [index: string]: any}> = {
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

type LoginPayload = {
    [LoginTypes.Update] : UserLoginData
}

type LoginActions = ActionMap<LoginPayload>[keyof ActionMap<LoginPayload>];