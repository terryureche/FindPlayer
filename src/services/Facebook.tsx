import * as FacebookSDK from 'expo-facebook';
import {UserData} from '../types/types';
import {facebookId} from "../constants/Credentials";

//react-query -> db
//redux-saga


class Facebook {
    private _userId!: string;
    private _token!: string;
    private _name!: string;

    getSdk() {
        return FacebookSDK;
    }

    async login() {
        await FacebookSDK.initializeAsync({
          appId: facebookId
        });

        const data = await FacebookSDK.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });

        if(data['type'] === 'success') {
            this._token = data['token'];

            const meMinimalData = await this.getMe();

            this._name = meMinimalData.name;
            this._userId = meMinimalData.id;
        } else {
            //todo handle errors
        }
    }

    getUserData(): UserData{
        return {
            pictureUrl: this.getUserProfilePictureUri(),
            id: this._userId,
            isLogged: !!this._token,
            token: this._token,
            userName: 'gigel',
        }
    }

    private getUserProfilePictureUri(): string {
        return `https://graph.facebook.com/${this._userId}/picture?access_token=${this._token}&type=large&width=720&height=720`;
    }

    private async getMe(): Promise<any> {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${this._token}`);
        return await response.json();
    }
}

export default Facebook;