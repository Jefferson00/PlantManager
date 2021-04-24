import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, TextInputProps } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import styled from 'styled-components/native';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { pickImage } from '../libs/storage';

export function ImageSelection() {
    const [userImage, setUserImage] = useState<string | null>(null);
    const navigation = useNavigation();

    const selectImage = async () => {
        let result = await pickImage()
    
        if (result) {
            setUserImage(result);
        }
    };

    async function handleSubmit() {
        if (!userImage)
        return Alert.alert('Escolha uma imagem para continuarmos!');
        
        try {
            if(userImage) await AsyncStorage.setItem('@plantmanager:userImage', userImage);
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            }); 
        } catch (error) {
            Alert.alert('Não possível salvar sua foto');
        }
    }

    return (
        <MainContainer>
            <KeyboardAvoidingView
                style={{ flex: 1, width: '100%' }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <MainContent>
                    <Form>
                        <FormHeader>
                            <Emoji>
                                📷
                            </Emoji>
                            <Title>
                               Sua foto
                            </Title>
                            <Subtitle>
                                Agora podemos escolher uma {'\n'}
                                foto para ficar no seu perfil.
                            </Subtitle>
                        </FormHeader>
                        <ButtonView>
                            <ImageButton onPress={selectImage}>
                                {userImage ?
                                    <ImageButtonPreview source={{uri:userImage}}/>
                                :
                                    <Feather name="upload" size={80} color={colors.white}/>
                                }
                            </ImageButton>
                            <Button 
                                title={"Salvar"}
                                onPress={handleSubmit}
                            />
                        </ButtonView>
                    </Form>
                </MainContent>
            </KeyboardAvoidingView>
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
`

const Form = styled.View`
    flex:1;
    justify-content:center;
    padding: 0 54px;
    align-items:center;
`

const FormHeader = styled.View`
    justify-content:center;
    align-items:center;
`

const Emoji = styled.Text`
    font-size:44px;
`

const Title = styled.Text`
    font-size:24px;
    line-height:32px;
    text-align:center;
    margin-top:24px;
    color:${colors.heading};
    font-family:${fonts.heading};
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

const ButtonView = styled.View`
    margin-top: 40px;
    width:100%;
    padding:24px;
`

const ImageButton = styled.TouchableOpacity`
    width:160px;
    height:160px;
    border-radius:80px;
    margin-left:auto;
    margin-right:auto;
    align-items: center;
    justify-content:center;
    background-color:${colors.blue};
    margin-bottom:20px;
`

const ImageButtonPreview = styled.Image`
    width:160px;
    height:160px;
    border-radius:80px;
`