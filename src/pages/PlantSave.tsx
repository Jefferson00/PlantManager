import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import {SvgFromUri} from 'react-native-svg'
import styled from 'styled-components/native'
import DataTimePicker, {Event} from '@react-native-community/datetimepicker'

import Waterdrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Alert, Platform, ScrollView } from 'react-native';
import { format, isBefore } from 'date-fns';
import { PlantProps, savePlant } from '../libs/storage';

interface Params{
    plant: PlantProps;
}

export function PlantSave(){
    const route = useRoute();
    const navigation = useNavigation();
    const {plant} = route.params as Params;

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS === 'android'){
            setShowDatePicker((oldState) => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏰')
        }

        if(dateTime) setSelectedDateTime(dateTime);
    }

    function handleOpenDatePicker(){
        setShowDatePicker((oldState) => !oldState);;
    }

    async function handleSavePlant(){
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime,
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
                buttonTitle: 'Muito Obrigado',
                icon: 'hug',
                nextScreen: 'MyPlants',
            })
        } catch (error) {
            return Alert.alert('Não foi possível salvar a planta. 😢')
        }
    }

    return(
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{justifyContent: 'space-between', flexGrow:1}}
        >
        <MainContainer>
            <PlantInfo>
                <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}
                />

                <Title>
                    {plant.name}
                </Title>
                <InfoText>
                    {plant.about}
                </InfoText>
            
            </PlantInfo>


            <ControllerView>
                <TipContainer>
                    <TipImage 
                        source={Waterdrop} 
                    />
                    <TipText>
                        {plant.water_tips}
                    </TipText>
                </TipContainer>

                <AlertLabel>
                    Escolha o melhor horário para ser lembrado:
                </AlertLabel>

                {showDatePicker &&
                    (
                        <DataTimePicker
                            value={selectedDateTime}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeTime}
                        />
                    )
                }

                {Platform.OS === 'android' && (
                    <DateTimePickerButton onPress={handleOpenDatePicker}>
                        <DateTimePickerText>
                            Selecionar hora:
                        </DateTimePickerText>
                        <DateTimePickerText
                            style={{fontFamily:fonts.heading, fontSize:17}}
                        >
                            {format(selectedDateTime, 'HH:mm')}
                        </DateTimePickerText>
                    </DateTimePickerButton>
                )}

                <Button
                    title="Cadastrar planta"
                    onPress={handleSavePlant}
                />
            </ControllerView>
        </MainContainer>
        </ScrollView>
    )
}

const MainContainer = styled.View`
    flex:1;
    justify-content:space-between;
    background-color:${colors.shape};
`

const PlantInfo = styled.View`
    flex:1;
    padding: 50px 30px;
    align-items:center;
    justify-content:center;
    background-color:${colors.shape};
`

const Title = styled.Text`
    font-family:${fonts.heading};
    font-size:24px;
    color:${colors.heading};
    margin-top:15px;
`

const InfoText = styled.Text`
    text-align:center;
    font-family:${fonts.text};
    color:${colors.heading};
    font-size:17px;
    margin-top:10px;
`
const ControllerView = styled.View`
    background-color:${colors.white};
    padding: 20px;
`

const TipContainer  = styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    background-color:${colors.blue_light};
    padding:20px;
    border-radius:20px;
    position:relative;
    bottom:60px;
`

const TipImage = styled.Image`
    width: 56px;
    height: 56px;
`

const TipText = styled.Text`
    flex:1;
    text-align:justify;
    font-family:${fonts.text};
    color:${colors.blue};
    font-size:17px;
    margin-left:20px;
`

const AlertLabel = styled.Text`
    text-align:center;
    font-family:${fonts.complement};
    color:${colors.heading};
    font-size:12px;
    margin-bottom:5px;
`

const DateTimePickerButton = styled.TouchableOpacity`
    width:100%;
    align-items:center;
    padding: 10px 40px;
    background-color:${colors.shape};
    border-radius:20px;
    margin: 20px 0;
`

const DateTimePickerText = styled.Text`
    font-family:${fonts.text};
    color:${colors.heading};
`