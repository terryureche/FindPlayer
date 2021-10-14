import React, { Dispatch, SetStateAction } from 'react';
import tw from 'tailwind-react-native-classnames';
import { Button } from 'react-native-elements';
import { Text, View } from '../Themed';

export default function InitUserStepPersonalDescription({
    setCurrentStep,
}: {
    setCurrentStep: Dispatch<SetStateAction<number>>,

}) {
    const saveUserData = () => {}

    return (
        <View style={tw`bg-indigo-50`}>
            <Button buttonStyle={tw`mt-20`} title="Save" onPress={saveUserData}/>
        </View>
    )
}

/**
 * Todo:
 * player foot
 * player position
 * player description
 * player age
 * player team
 */