import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';
import { View } from 'react-native';
import tw from "../../utils/tailwind";

export default function LoginProfilePicture({ url, source,  imageStyle = '' }: {url: string, source:any, imageStyle?: Object}) {
  return (
    <View style={tw`flex items-center justify-center bg-transparent`}>
        <Image
        style={[tw`w-36 h-36 rounded-full border-2`, imageStyle] as StyleProp<ImageStyle>}
            source={url ? {uri: url} :  source}
        />
    </View>
  );
}