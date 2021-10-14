import React, { useReducer, useState, createContext } from 'react';
import { userReducer } from './loginReducers';
import { InitialStateType, UserLoginData } from './type';


const initialState: InitialStateType = {
    user: {
        id: '',
        isLogged: false,
        token: '',
        userName: '',
        profilePictureUrl: '',
        initialSetup: false,
        location: '',
        playerQualities: {
            foot: '',
            position: '',
            description: '',
            age: null,
            team: ''
        }
    }
};

const LoginContext = createContext<{
    state: InitialStateType,
    dispatch: React.Dispatch<any>
}>
({
    state: initialState,
    dispatch: () => null
});

const mainReducer = ({ user }: {user: UserLoginData}, action: any) => ({
    user: userReducer(user, action)
})

const LoginProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    return (
        <LoginContext.Provider value={{state, dispatch}}>
            {children}
        </LoginContext.Provider>
    )
}

export { LoginContext, LoginProvider }