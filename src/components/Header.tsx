import React, { useContext, useEffect, useState } from 'react';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import styled from 'styled-components/native';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { pickImage } from '../libs/storage';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { UserContext } from '../contexts/UserContext';

interface HeaderProps{
    screen: 'PlantSelect' | 'MyPlants';
}

export function Header({screen}:HeaderProps){
    const [userName, setUserName] = useState<string>();
    const [isInputNameActive, setIsInputNameActive] = useState(false);

    const {selectImage, userImage} = useContext(UserContext);

    function handleUpdateUserName(){
        if (isInputNameActive) handleSubmitUserName();
        setIsInputNameActive((oldState) => !oldState);
    }

    function handleInputChange(value: string) {
        setUserName(value);
    }

    async function handleSubmitUserName() {
        if (!userName && userName !== '')
        return Alert.alert('Me diz como chamar você?');

        try {
            await AsyncStorage.setItem('@plantmanager:user', userName);
            getUserName();
        } catch (error) {
            Alert.alert('Não possível salvar o seu nome');
        }
    }

    async function getUserName(){
        const user = await AsyncStorage.getItem('@plantmanager:user');
        setUserName(user || '');
    }

    useEffect(()=>{
        getUserName();
    },[]);

    return(
        <MainContainer>
                {screen === 'MyPlants' ?
                <TextContent>
                    <GreetingText>Minhas</GreetingText>
                    <Title>Plantinhas</Title>
                </TextContent>
                :
                <TextContent>
                    <GreetingText>Olá,</GreetingText>
                    <TextContent style={{
                        flexDirection:'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {isInputNameActive
                        ?   <UsernameText
                                editable={isInputNameActive}
                                value={userName}
                                onChangeText={handleInputChange}
                                maxLength={13}
                            />
                        :   <Title>{userName}</Title>
                        }
                        <InputUpdateButton
                            onPress={handleUpdateUserName}
                        >
                            {isInputNameActive 
                                ? 
                                <Feather name="save" size={30} color={colors.green}/>
                                :
                                <Feather name="edit-3" size={30} color={colors.green_light}/>
                            }
                        </InputUpdateButton>
                    </TextContent>
                </TextContent>
                }

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
    padding: 20px 30px;
    margin-top:28px;
`

const TextContent = styled.View`

`

const InputUpdateButton = styled.TouchableOpacity`
    margin-left:5px;
`

const GreetingText = styled.Text`
    font-family:${fonts.greeting};
    color:${colors.heading};
    font-size:32px;
`
const Title = styled.Text`
    font-family:${fonts.heading};
    color:${colors.heading};
    font-size:32px;
`

const UsernameText = styled.TextInput`
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