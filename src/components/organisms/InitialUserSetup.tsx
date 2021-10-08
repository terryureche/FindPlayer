import React from 'react';
import { Overlay } from 'react-native-elements';
import { Text } from '../Themed';

export default function InitialUserSetup({setVisible, isVisible}: {setVisible: any, isVisible: boolean}) {
    return (
        <Overlay isVisible={isVisible} onBackdropPress={() => {}}>
            <Text>Hello</Text>
        </Overlay>
    )
}