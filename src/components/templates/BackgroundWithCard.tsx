import React from 'react';
import {ImageBackground, ImageSourcePropType} from "react-native";
import tw from "../../utils/tailwind";
import { View } from '../Themed';

export default function BackgroundWithCard({backgroundImagePath, children} : {backgroundImagePath: ImageSourcePropType, children: React.ReactElement}) {
  console.log(backgroundImagePath);
  return (
    <View>
      <ImageBackground style={tw`h-full w-full`} source={backgroundImagePath}>
        <View style={tw`flex-1 items-center justify-end bg-transparent`}>
          <View style={tw`h-4/6 w-full rounded-3xl bg-white border-gray-200`}>
            {children}
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}