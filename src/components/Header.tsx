import React, { useEffect, useState } from 'react';


import colors from '../styles/colors';
import fonts from '../styles/fonts';
import styled from 'styled-components/native';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { pickImage } from '../libs/storage';
import { Alert } from 'react-native';


export function Header(){

    const [userName, setUserName] = useState<string>();
    const [userImage, setUserImage] = useState<string>();

    const selectImage = async () => {
        let result = await pickImage()
    
        if (result) {
            
            try {
                await AsyncStorage.setItem('@plantmanager:userImage', result);
                
                setUserImage(result);
            } catch (error) {
                Alert.alert('Não possível salvar sua foto');
            }
        }
    };

    useEffect(()=>{
        async function getUserName(){
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }

        getUserName();
    },[userName]);

    useEffect(()=>{
        async function getUserImage(){
            const user = await AsyncStorage.getItem('@plantmanager:userImage');
            setUserImage(user || '');
        }

        getUserImage();
    },[userImage]);

    return(
        <MainContainer>
            <TextContent>
                <GreetingText>Olá,</GreetingText>
                <UsernameText>{userName}</UsernameText>
            </TextContent>

            <ImageButton onPress={selectImage}>
                <ImageContent source={{uri:userImage}}/>
            </ImageButton>
        </MainContainer>
    )
}

const MainContainer = styled.View`
    width:100%;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    padding: 20px 32px;
    margin-top:28px;
`

const TextContent = styled.View`

`

const GreetingText = styled.Text`
    font-family:${fonts.greeting};
    color:${colors.heading};
    font-size:32px;
`
const UsernameText = styled.Text`
    font-family:${fonts.heading};
    color:${colors.heading};
    font-size:32px;
`

const ImageContent = styled.Image`
    width:70px;
    height:70px;
    border-radius:35px;
`

const ImageButton = styled.TouchableOpacity`
    width:70px;
    height:70px;
    border-radius:35px;
`