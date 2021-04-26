import React, {createContext, ReactNode, useState, useEffect} from 'react';
import { Alert } from 'react-native';
import { pickImage } from '../libs/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'

interface UserContextData {
    userImage:string | null;
    selectImage: () => void;
}

interface UserProviderProps{
    children: ReactNode;
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({children}: UserProviderProps){
    const [userImage, setUserImage] = useState<string | null>(null);

    const selectImage = async () => {
        let result = await pickImage()
    
        if (result) {
            
            try {
                await AsyncStorage.setItem('@plantmanager:userImage', result);
                
                setUserImage(result);
                getUserImage();
            } catch (error) {
                Alert.alert('Não possível salvar sua foto');
            }
        }
    };
    
    async function getUserImage(){
        const user = await AsyncStorage.getItem('@plantmanager:userImage');
        setUserImage(user || '');
    }

    useEffect(()=>{
        getUserImage();
    },[userImage]);

    return(
        <UserContext.Provider value={{
            userImage,
            selectImage
        }}>
            {children}
        </UserContext.Provider>
    )
}