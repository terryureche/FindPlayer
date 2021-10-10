import React, { useState } from 'react';
import { Overlay } from 'react-native-elements';
import { Text } from '../Themed';
import tw from 'tailwind-react-native-classnames';
import InitUserStep1 from '../molecules/InitUserStep1';
import InitUserStep2 from '../molecules/InitUserStep2';

export default function InitialUserSetup({setVisible, isVisible}: {setVisible: any, isVisible: boolean}) {
    const [currentStep, setCurrentStep] = useState(0);
    const [locationToken, setLocationToken] = useState<string>();

    return (
        <Overlay overlayStyle={tw`h-4/6 w-5/6 bg-indigo-50`} isVisible={isVisible} onBackdropPress={() => {}}>
            {currentStep === 0 && <InitUserStep1 setCurrentStep={setCurrentStep} setLocationToken={setLocationToken}/>}
            {currentStep === 1 && <InitUserStep2 setCurrentStep={setCurrentStep} locationToken={locationToken}/>}
        </Overlay>
    )
}