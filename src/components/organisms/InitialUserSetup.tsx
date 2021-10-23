import React, { useEffect, useState } from 'react';
import { Overlay } from 'react-native-elements';
import { Text } from '../Themed';
import tw from 'tailwind-react-native-classnames';
import InitUserWelcome from '../molecules/InitUserWelcome';
import InitUserStepLocation from '../molecules/InitUserStepLocation';
import { UserConfigLocation } from '../../types/types';
import { LoginTypes } from '../../contexts/loginContext/type';
import InitUserStepPersonalDescription from '../molecules/InitUserStepPersonalDescription';

export default function InitialUserSetup({
        setVisible,
        isVisible,
        userContextDispatch,
    }: {
        setVisible: React.Dispatch<React.SetStateAction<boolean>>,
        isVisible: boolean,
        userContextDispatch: React.Dispatch<any>
    }
) {
    const [currentStep, setCurrentStep] = useState(0);
    const [locationToken, setLocationToken] = useState<string>();
    const [currentLocation, setCurrentLocation] = useState<UserConfigLocation>({city: null});

    useEffect(() => {
        (() => {
            if(!currentLocation.city) {
                return;
            }

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
            isVisible={isVisible} onBackdropPress={() => {}}>
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
                <InitUserStepPersonalDescription setVisible={setVisible} setCurrentStep={setCurrentStep}/>
            }
        </Overlay>
    )
}