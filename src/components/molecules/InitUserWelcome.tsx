import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import { Text, View } from '../Themed';
import { Image } from 'react-native-elements';
import { UniversalDataToken } from '../../constants/Tokens';
import axios from 'axios';
import tw from "../../utils/tailwind";

export default function InitUserWelcome(
    {setCurrentStep, setLocationToken}:
    {
        setCurrentStep: Dispatch<SetStateAction<number>>,
        setLocationToken:  React.Dispatch<React.SetStateAction<string | undefined>>
    }
) {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            const resp = await axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
                headers: {
                    'Accept': 'application/json',
                    'api-token': UniversalDataToken,
                    'user-email': 'findplayer@gmail.com'
                }
            });

            const token:string = resp.data['auth_token'];
            //todo: handling error in future
            setLocationToken(token);
            setLoading(false);
        })();
    }, [])

    const onStart = () => {
        if(!loading) {
            setCurrentStep(1);
        }
    }

    return (
        <View style={tw`bg-indigo-50`}>
            <Text style={tw`text-center text-3xl text-blue-900 mt-16`}>
                Let's set up your profile!
            </Text>
            <Text style={tw`text-center text-blue-900 mt-6`}>
                This configuration will be made only once.
            </Text>
            <View style={tw`bg-indigo-50 flex items-center`}>
                <Image style={tw`h-40 w-20 mt-12`} source={require('./../../assets/images/init_user_1_face.png')} />
                <Button
                    buttonStyle={tw`w-48 mt-20`}
                    loading={loading}
                    title="Start"
                    onPress={onStart}
                />
            </View>
        </View>
    )
}