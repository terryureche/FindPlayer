import { LoginActions, LoginTypes, UserLoginData } from "./type";

export const userReducer = (state: UserLoginData, action: LoginActions) => {
    switch (action.type) {
        case LoginTypes.UpdateLogin:
            return Object.assign({}, state,
                {
                    id: action.payload.id,
                    isLogged: action.payload.isLogged,
                    token: action.payload.token,
                    userName: action.payload.userName,
                    profilePictureUrl: action.payload.profilePictureUrl,
                    initialSetup: action.payload.initialSetup
                }
            );
        case LoginTypes.UpdateLocation:
                return Object.assign({}, state,
                    {
                        location: action.payload.location
                    });
        case LoginTypes.UpdateQualities:
                    return Object.assign({}, state,
                        {
                            playerQualities: action.payload.playerQualities
                        })
        default:
            return state;
    }
}