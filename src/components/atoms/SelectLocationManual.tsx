import { useState } from "react";
import { Alert } from "react-native";
import tw from 'twrnc';
import React from "react";
import { Text, View } from '../Themed';
import axios from "axios";
import { Button } from "react-native-elements";
import ExternalPickerCountry from "./ExternalPickerCountry";
import ExternalPickerState from "./ExternalPickerState";
import ExternalPickerCity from "./ExternalPickerCity";
import { UserConfigLocation } from "../../types/types";

export default function SelectLocationManual(
    {
        token,
        setShowManualSelect,
        setCurrentLocation,
    }:
    {
        token: string | undefined,
        setShowManualSelect: React.Dispatch<React.SetStateAction<boolean>>,
        setCurrentLocation: React.Dispatch<React.SetStateAction<UserConfigLocation>>,
}) {
    const [country, setCountry] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<string>('');

    const invalidSave = (errorMessage: string) => {
        Alert.alert('Invalid Location', errorMessage);
    }

    const fetchCountry = async () => {
        const resp = axios.get('https://www.universal-tutorial.com/api/countries/', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        return resp;
    }

    const fetchState = async () => {
        if(country) {
            const resp = axios.get(`https://www.universal-tutorial.com/api/states/${country}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            return resp;
        }
    }

    const fetchCity = async () => {
        if(state) {
            const resp = axios.get(`https://www.universal-tutorial.com/api/cities/${state}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            return resp;
        }
    }

    const saveLocation = async () => {
        if(!country) {
            invalidSave('Please select a country');
            return;
        }

        if(!state) {
            invalidSave('Please select a state');
            return;
        }

        if(!city) {
            setCurrentLocation({city: state});
        } else {
            setCurrentLocation({city: city});
        }

        setShowManualSelect(false);
    }

    const cancelLocation = async () => {
        setShowManualSelect(false);
    }

    return (
        <View style={tw`bg-indigo-50`}>
            <View style={tw`bg-indigo-50 flex-row`}>
                <ExternalPickerCountry
                    fetchLocation={fetchCountry}
                    name="country"
                    setCountry={setCountry}
                    country={country}
                />
                <ExternalPickerState
                    fetchLocation={fetchState}
                    name="state"
                    setState={setState}
                    state={state}
                    country={country}/>
                <ExternalPickerCity
                    fetchLocation={fetchCity}
                    name="city"
                    setCity={setCity}
                    city={city}
                    state={state}
                />
            </View>
            <Button
                buttonStyle={tw`mt-8`}
                title="Set Location"
                type="solid"
                onPress={saveLocation}
            />
            <Button
                buttonStyle={tw`mt-2`}
                title="Cancel"
                type="solid"
                onPress={cancelLocation}
            />
        </View>
    )
}