import React, { useEffect, useState } from 'react';
import { Overlay } from 'react-native-elements';
import tw from "../../utils/tailwind";
import InitUserWelcome from '../molecules/InitUserWelcome';
import InitUserStepLocation from '../molecules/InitUserStepLocation';
import { UserConfigLocation } from '../../types/types';
import { LoginTypes } from '../../contexts/loginContext/type';
import InitUserStepPersonalDescription from '../molecules/InitUserStepPersonalDescription';
import useAsyncStorage from "../../hooks/useAsyncStorage";

export default function InitialUserSetup({
        setIsUserConfigured,
        isUserConfigured,
        userContextDispatch,
    }: {
        setIsUserConfigured: React.Dispatch<React.SetStateAction<boolean>>,
        isUserConfigured: boolean,
        userContextDispatch: React.Dispatch<any>
    }
) {
    const NOT_LOGIN = {
        id: '',
        isLogged: false,
        token: '',
        userName: '',
        profilePictureUrl: ''
    };

    const [currentStep, setCurrentStep] = useState(0);
    const [locationToken, setLocationToken] = useState<string>();
    const [currentLocation, setCurrentLocation] = useState<UserConfigLocation>({city: null});
    const [loginInfo, updateLoginInfo] = useAsyncStorage('login', NOT_LOGIN);

    useEffect(() => {
        (() => {
            if(!currentLocation.city) {
                return;
            }

            updateLoginInfo(Object.assign({}, loginInfo, {initialSetup: true}));

            userContextDispatch({
                type: LoginTypes.UpdateLocation,
                payload: {
                    location: currentLocation
                }
            });
        })();
    }, [currentLocation])

    return (
        <Overlay
            overlayStyle={tw`h-4/6 w-5/6 bg-indigo-50`}
            isVisible={!isUserConfigured} onBackdropPress={() => {}}>
            {
                currentStep === 0 && <InitUserWelcome setCurrentStep={setCurrentStep} setLocationToken={setLocationToken}/>}
            {
                currentStep === 1
                    &&
                <InitUserStepLocation
                    setCurrentStep={setCurrentStep}
                    currentLocation={currentLocation}
                    setCurrentLocation={setCurrentLocation}
                    locationToken={locationToken}
                />
            }
            {
                currentStep === 2
                    &&
                <InitUserStepPersonalDescription setIsUserConfigured={setIsUserConfigured} setCurrentStep={setCurrentStep}/>
            }
        </Overlay>
    )
}