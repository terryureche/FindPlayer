import React from 'react';
import { View, Text } from 'react-native';

export default function Divider({text: text} : {text: String}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 25, paddingRight: 25}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
      <View>
        <Text style={{width: 100, textAlign: 'center', color:'gray'}}>{text}</Text>
      </View>
      <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
    </View>
  )
}