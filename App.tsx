import React, { useEffect } from 'react';
import Routes from './src/routes/'
import {useFonts, Jost_400Regular, Jost_600SemiBold, Jost_300Light} from '@expo-google-fonts/jost'
import AppLoading from 'expo-app-loading'
import * as Notifications from 'expo-notifications';
import { PlantProps } from './src/libs/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
    Jost_300Light,
  })

  useEffect(()=>{
      const subscription = Notifications.addNotificationReceivedListener(
        async notification => {
          const data = notification.request.content.data.plant as PlantProps;
          console.log(data)
        }
      )

      /*async function noifications(){
        await Notifications.cancelAllScheduledNotificationsAsync();
      }
      
      noifications();*/
      
      async function deletde() {
        await AsyncStorage.clear();
      }
      
      deletde();
      
      return () => subscription.remove();
  },[])

  if (!fontsLoaded){
    return <AppLoading/>
  }

  return (
    <Routes/>
  );
}

