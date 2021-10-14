import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import tw from "tailwind-react-native-classnames";
import { LocationRequestType, StateType } from "../../types/types";

export default function ExternalPickerState(
    {fetchLocation, name, setState, state, country} : {
        fetchLocation: any,
        name: string,
        setState: React.Dispatch<React.SetStateAction<string>>,
        state: string,
        country: string,
    }
) {
    const [states, setStates] = useState<Array<StateType>>([]);

    const { isLoading, isError, data, error } = useQuery<LocationRequestType>([name, country], fetchLocation,);

    useEffect(() => {
        if(data) {
            const localData: StateType[] = data.data as StateType[];
            const localStates: StateType[] = [
                ...[{state_name: ''}],
                ...localData
            ];

            setStates(localStates);
        }
    }, [isLoading]);

    return (
        <Picker
            itemStyle={tw`text-xs`}
            style={tw`w-24`}
            selectedValue={state}
            onValueChange={(value: string) => setState(value)}
        >
            {
                states.map((item) =>
                    <Picker.Item
                        key={item.state_name}
                        label={item.state_name}
                        value={item.state_name}
                    />
                )
            }
        </Picker>
    );
}