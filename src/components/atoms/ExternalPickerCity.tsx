import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import tw from "tailwind-react-native-classnames";
import { LocationRequestType, CityType } from "../../types/types";
import { View } from "../Themed";

export default function ExternalPickerCity(
    {fetchLocation, name, setCity, city, state} : {
        fetchLocation: any,
        name: string,
        setCity: React.Dispatch<React.SetStateAction<string>>,
        city: string,
        state: string,
    }
) {
    const [cities, setCities] = useState<Array<CityType>>([]);

    const { isLoading, isError, data, error } = useQuery<LocationRequestType>([name, state], fetchLocation);

    useEffect(() => {
        if(data) {
            const localData: CityType[] = data.data as CityType[];
            const localCities: CityType[] = [
                ...[{city_name: ''}],
                ...localData
            ];

            setCities(localCities);
        }
    }, [isLoading]);

    return (
        <Picker
            itemStyle={tw`text-xs`}
            style={tw`w-24`}
            selectedValue={city}
            onValueChange={(value: string) => setCity(value)}
        >
            {
                cities.map((item) =>
                    <Picker.Item
                        key={item.city_name}
                        label={item.city_name}
                        value={item.city_name}
                    />
                )
            }
        </Picker>

    )

}