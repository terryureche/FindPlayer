import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import tw from 'twrnc';
import { View } from "../Themed";

const ages: number[] = [];

for (let i = 1; i < 101; i++) {
    ages.push(i);
}

export default function AgePicker({
    selectedAge,
    setSelectedAge
}: {
    selectedAge: number,
    setSelectedAge: React.Dispatch<React.SetStateAction<number>>,
}) {
    return (
        <View style={tw`flex items-center bg-transparent`}>
            <Picker
                itemStyle={tw`text-xs h-24`}
                style={tw`w-1/2`}
                selectedValue={selectedAge}
                onValueChange={(value: number) => setSelectedAge(value)}
            >
                {
                    ages.map((age) =>
                        <Picker.Item
                            key={age}
                            label={age.toString()}
                            value={age}
                        />
                    )
                }
            </Picker>
        </View>
    );
}