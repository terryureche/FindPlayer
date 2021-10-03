import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useCallback} from 'react';

const useStoredState = <T>(
  key: string,
  defaultValue: T,
): [T, (newValue: T) => void, boolean] => {
  const [state, setState] = useState({
    hydrated: false,
    storageValue: defaultValue,
  })
  const {hydrated, storageValue} = state

  useEffect(() => {
    const pullFromStorage = async () => {
      let value = defaultValue
      try {
        const fromStorage = await AsyncStorage.getItem(key)
        if (fromStorage) {
          value = JSON.parse(fromStorage)
        }
      } catch (e) {
        console.log('Could not read from storage for key: ', key, e)
      }

      return value
    }
    pullFromStorage().then((value) => {
      setState({hydrated: true, storageValue: value})
    })

    // We don't want to update when the defaultValue changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const updateStorage = useCallback(
    async (newValue: T) => {
      setState({hydrated: true, storageValue: newValue})
      const stringifiedValue = JSON.stringify(newValue)
      await AsyncStorage.setItem(key, stringifiedValue)
    },
    [key],
  )

  return [storageValue, updateStorage, hydrated]
}

export default useStoredState
