import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { Text, View } from '../Themed';
import { Image } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import * as Location from 'expo-location';
import Spinner from 'react-native-loading-spinner-overlay';
import { UserConfigLocation } from '../../types/types';
import SelectLocationManual from '../atoms/SelectLocationManual';
import { Alert } from 'react-native';

export default function InitUserStep2(
    { setCurrentStep, currentLocation, setCurrentLocation, locationToken }: {
        setCurrentStep: Dispatch<SetStateAction<number>>,
        currentLocation: UserConfigLocation,
        setCurrentLocation: React.Dispatch<React.SetStateAction<UserConfigLocation>>,
        locationToken: string | undefined
    }
) {
    const [spinnerVisibility, setSpinnerVisibility] = useState<boolean>(true);
    const [showManualSelect, setShowManualSelect] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                let {status}: {status: string} = await Location.requestForegroundPermissionsAsync();
                setSpinnerVisibility(false);

                if(status !== 'granted') {
                    setShowManualSelect(true);
                    throw 'No permission from user.';
                }

                let coord: Location.LocationObject = await Location.getCurrentPositionAsync({});
                let reverseLocation = {
                    longitude: coord.coords.longitude,
                    latitude: coord.coords.latitude
                };
                let location = await Location.reverseGeocodeAsync(reverseLocation);

                if(location.length > 0) {
                    setShowManualSelect(false);
                    setCurrentLocation({city: location[0].city});
                }
            } catch(e) {
                setSpinnerVisibility(false);
                setShowManualSelect(true);
            }
        })();
    }, [])

    const goToNextStep = () => {
        if(!currentLocation.city) {
            Alert.alert('Invalid Location', 'You should set your location');
        } else {
            return;
        }
    }

    return (
        <View style={tw`bg-indigo-50`}>
            <Spinner
                visible={spinnerVisibility}
                textContent={'Loading...'}
            />
            <Text style={tw`text-center text-3xl text-blue-900 mt-16`}>
                Choose your location
            </Text>
            <Text style={tw`text-center text-blue-900 mt-6`}>
                This configuration will be made only once.
            </Text>
            <View style={tw`bg-indigo-50 flex items-center`}>
                {
                    !showManualSelect
                    &&
                    <Image
                        style={tw`h-28 w-36 mt-12`}
                        source={require('./../../assets/images/init_user_2_location.png')}
                    />
                }
                <View style={tw`bg-indigo-50`}>
                    {
                        <Text style={tw`text-blue-900 mt-10 text-center`}>Current Location: {currentLocation.city}</Text>
                    }
                    {
                        !showManualSelect
                        &&
                        <Button
                            type="clear"
                            title="Change Location"
                            onPress={() => {
                                setShowManualSelect(true);
                            }}
                        />
                    }
                    {
                        showManualSelect
                        &&
                        <SelectLocationManual
                            token={locationToken}
                            setShowManualSelect={setShowManualSelect}
                            setCurrentLocation={setCurrentLocation}
                        />
                    }
                </View>
                {
                !showManualSelect
                &&
                <Button buttonStyle={tw`w-48 mt-20`} title="Continue" onPress={goToNextStep}/>
                }
            </View>
        </View>
    )
}