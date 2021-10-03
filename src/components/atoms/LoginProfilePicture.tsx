import * as React from 'react';
import { Image } from 'react-native';
import { Text, View } from '../Themed';

export default function LoginProfilePicture({ url }: {url: string}) {
  console.log(url);
  return (
    <View>
        <Image
        style={{
          width: 150,
          height: 150
        }}
            source={{uri: url}}
        />
    </View>
  );
}