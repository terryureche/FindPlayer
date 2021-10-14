import { LoginActions, LoginTypes, UserLoginData } from "./type";

export const userReducer = (state: UserLoginData, action: LoginActions) => {
    switch (action.type) {
        case LoginTypes.Update:
            return Object.assign({}, state,
                {
                    id: action.payload.id,
                    isLogged: action.payload.isLogged,
                    token: action.payload.token,
                    userName: action.payload.userName,
                    profilePictureUrl: action.payload.profilePictureUrl,
                    initialSetup: action.payload.initialSetup,
                    location: action.payload.location,
                }
            );
        default:
            return state;
    }
}