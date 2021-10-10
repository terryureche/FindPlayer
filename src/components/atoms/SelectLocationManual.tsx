import { useState } from "react";
import tw from "tailwind-react-native-classnames";
import React from "react";
import { Text, View } from '../Themed';
import {Picker} from '@react-native-picker/picker';
import axios from "axios";
import ExternalPickerCountry from "./ExternalPickerCountry";
import ExternalPickerState from "./ExternalPickerState";
import ExternalPickerCity from "./ExternalPickerCity";

export default function SelectLocationManual({token}: {token: string | undefined}) {
    const [country, setCountry] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<string>('');

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
        debugger;
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

    return (
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
    )
}