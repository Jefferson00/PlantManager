import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Image} from 'react-native';

import WateringImg from '../assets/watering.png'
import colors from '../styles/colors';
import styled from 'styled-components/native';

export function Welcome() {
  return (
    <MainContainer>
      <StatusBar style="auto" />
        <Title>
            Gerencie {'\n'}
            suas plantas {'\n'} 
            de forma fácil
        </Title>

        <Image source={WateringImg}/>

        <Subtitle>Não esqueça mais de regar suas plantas.
            Nós cuidamos de lembrar você sempre que precisar.
        </Subtitle>

        <Button>
            <ButtonText>--</ButtonText>
        </Button>
    </MainContainer>
  );
}

const MainContainer = styled.SafeAreaView`
  flex:1;
  background-color:#ffffff;
  align-items:center;
  justify-content:space-between;
`
const Title = styled.Text`
  color:${colors.heading};
  font-size:32px;
  font-weight:bold;
  text-align:center;
  margin-top:58px;
`
const Subtitle = styled.Text`
  color:${colors.heading};
  font-size:18px;
  text-align:center;
  padding: 0 20px;
`
const Button = styled.TouchableOpacity`
  background-color:${colors.green};
  justify-content:center;
  align-items:center;
  border-radius:16px;
  margin-bottom:10px;
  width:56px;
  height:56px;
`

const ButtonText = styled.Text`
  color:${colors.white};
`