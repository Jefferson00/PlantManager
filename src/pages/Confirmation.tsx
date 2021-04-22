import React, { useState } from 'react';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import styled from 'styled-components/native';

import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/core';

export function Confirmation() {
    const navigation = useNavigation()

    function handleMoveOn() {
        navigation.navigate('PlantSelect')
    }

    return(
        <MainContainer>
            <MainContent>
                <Emoji>
                    😁
                </Emoji>

                <Title>
                    Prontinho
                </Title>
                <Subtitle>
                Agora vamos começar a 
                cuidar das suas plantinhas com muito cuidado.
                </Subtitle>
                <ButtonView>
                    <Button title="Começar"
                     onPress={handleMoveOn}
                    />
                </ButtonView>
            </MainContent>


        </MainContainer>
    )
}

const MainContainer = styled.SafeAreaView`
    flex:1;
    background-color:#ffffff;
    align-items:center;
    justify-content:space-around;
`

const MainContent = styled.View`
    flex:1;
    width:100%;
    justify-content:center;
    align-items:center;
    padding:30px;
`

const Emoji = styled.Text`
    font-size:96px;
`

const Subtitle = styled.Text`
    font-size:17px;
    line-height:25px;
    text-align:center;
    margin-top:15px;
    color:${colors.heading};
    font-family:${fonts.text};
    padding:0 10px;
`

const Title = styled.Text`
    font-size:24px;
    line-height:30px;
    text-align:center;
    margin-top:15px;
    color:${colors.heading};
    font-family:${fonts.heading};
`

const ButtonView = styled.View`
    width:100%;
    padding:0 50px;
    margin-top:40px;
`