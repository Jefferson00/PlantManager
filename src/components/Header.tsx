import React, { useEffect, useState } from 'react';


import colors from '../styles/colors';
import fonts from '../styles/fonts';
import styled from 'styled-components/native';

import userImg from '../assets/jefferson.jpg'

import AsyncStorage from '@react-native-async-storage/async-storage'

export function Header(){

    const [userName, setUserName] = useState<string>();

    useEffect(()=>{
        async function getUserName(){
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }

        getUserName();
    },[userName]);

    return(
        <MainContainer>
            <TextContent>
                <GreetingText>Olá,</GreetingText>
                <UsernameText>{userName}</UsernameText>
            </TextContent>

            <ImageContent source={userImg}/>
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