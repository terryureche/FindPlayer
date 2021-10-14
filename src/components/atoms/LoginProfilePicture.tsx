import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';
import { Text, View } from '../Themed';
import tw from 'tailwind-react-native-classnames';

export default function LoginProfilePicture({ url, imageStyle = '' }: {url: string, imageStyle?: Object}) {
  return (
    <View style={tw`flex items-center justify-center`}>
        <Image
        style={[tw`w-36 h-36 rounded-full  border-2`, imageStyle] as StyleProp<ImageStyle>}
            source={{uri: url}}
        />
    </View>
  );
}