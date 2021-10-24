import React, { Dispatch, SetStateAction, useState, useContext } from 'react';
import tw from 'twrnc';
import { Button, ButtonGroup } from 'react-native-elements';
import { Text, View } from '../Themed';
import { ScrollView, TextInput } from 'react-native';
import AgePicker from '../atoms/AgePicker';
import { Alert } from 'react-native';
import { LoginContext } from '../../contexts/loginContext/loginContext';
import { LoginTypes } from '../../contexts/loginContext/type';

export default function InitUserStepPersonalDescription({
    setCurrentStep,
    setVisible,
}: {
    setCurrentStep: Dispatch<SetStateAction<number>>,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,

}) {
    const legsOptions = ['Left', 'Right'];
    const positionsOptions = ['GK', 'DF', 'MF', 'FW'];
    const [selectedLegs, setSelectedLegs] = useState<number[]>([]);
    const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
    const [selectedAge, setSelectedAge] = useState<number>(18);
    const [description, setDescription] = useState<string>();
    const [team, setTeam] = useState<string>();
    const { state, dispatch } = useContext(LoginContext);

    const saveUserData = () => {
        if(selectedLegs.length < 1) {
            Alert.alert('Invalid Legs', 'Please select at least one leg');

            return;
        }

        if(selectedPositions.length < 1) {
            Alert.alert('Invalid Position(s)', 'Please select at least one position(s)');

            return;
        }

        dispatch({
            type: LoginTypes.UpdateQualities,
            payload: {
                initialSetup: true,
                playerQualities: {
                    legs: selectedLegs,
                    position: selectedPositions,
                    description,
                    age: selectedAge,
                    team
                }
            }
        });

        setVisible(false);
    }

    return (
        <View style={tw`bg-indigo-50`}>
            <ScrollView style={tw`w-full h-5/6 mt-8 mb-4`} alwaysBounceVertical={true} centerContent={true}>
                <View style={tw`bg-transparent`}>
                    <Text style={tw`text-center`}>Select you foot:</Text>
                    <ButtonGroup
                        onPress={setSelectedLegs}
                        selectedIndexes={selectedLegs}
                        buttons={legsOptions}
                        selectMultiple={true}
                    />
                    <Text style={tw`text-center mt-4`}>Position(s) you love</Text>
                    <ButtonGroup
                        onPress={setSelectedPositions}
                        selectedIndexes={selectedPositions}
                        buttons={positionsOptions}
                        selectMultiple={true}
                    />
                    <Text style={tw`text-center mt-4`}>Age</Text>
                    <AgePicker
                        selectedAge={selectedAge}
                        setSelectedAge={setSelectedAge}
                    />
                    <TextInput
                        style={tw`m-4 p-2 border-solid border border-gray-500`}
                        multiline
                        numberOfLines={2}
                        placeholder="Describe yourself"
                        value={description}
                        onChangeText={setDescription}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={tw`mt-4 ml-4 mr-4 p-2 border-solid border border-gray-500`}
                        multiline
                        numberOfLines={2}
                        placeholder="Your team(if you have one)"
                        value={team}
                        onChangeText={setTeam}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
            </ScrollView>
            <Button buttonStyle={tw``} title="Save" onPress={saveUserData}/>
        </View>
    )
}
