import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import tw from "tailwind-react-native-classnames";
import { LocationRequestType, CountryType } from "../../types/types";
import { View } from "../Themed";

export default function ExternalPickerCountry(
    {fetchLocation, name, setCountry, country} : {
        fetchLocation: any,
        name: string,
        setCountry: React.Dispatch<React.SetStateAction<string>>,
        country: string
    }
) {
    const [countries, setCountries] = useState<Array<CountryType>>([]);

    const { isLoading, isError, data, error } = useQuery<LocationRequestType>(name, fetchLocation);


    useEffect(() => {
        if(data) {
            const localData: CountryType[] = data.data as CountryType[];
            const localCounties: CountryType[] = [
                ...[{
                    country_name: '',
                    country_short_name: '',
                    country_phone_code: ''
                }],
                ...localData
            ];
            setCountries(localCounties);
        }
    }, [isLoading]);

    return (
        <Picker
            itemStyle={tw`text-xs`}
            style={tw`w-24`}
            selectedValue={country}
            onValueChange={(value: string) => setCountry(value)}
        >
            {
                countries.map((country) =>
                    <Picker.Item
                        key={country.country_phone_code}
                        label={country.country_name}
                        value={country.country_name}
                    />
                )
            }
        </Picker>

    )

}