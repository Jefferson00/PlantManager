import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInputProps } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import styled from 'styled-components/native';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/core';

interface TextInputType extends TextInputProps {
    isFocused: boolean;
    isFilled: boolean;
}

export function UserIdentification() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [userName, setUserName] = useState<string>();
    const navigation = useNavigation();

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!userName);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setUserName(value);
    }


    function handleSubmit() {
        navigation.navigate('Confirmation')
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
                                {isFilled ? '😄' : '😃'}
                            </Emoji>
                            <Title>
                                Como podemos {'\n'}
                                chamar você?
                            </Title>
                        </FormHeader>
                        <Input placeholder={"Digite um nome"}
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                            isFocused={isFocused}
                            isFilled={isFilled}
                        />

                        <ButtonView>
                            <Button 
                                title={"Confirmar"}
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

const Input = styled.TextInput<TextInputType>`
    border-bottom-width:1px;
    border-color:${(props) => (
        props.isFocused || props.isFilled ? colors.green : colors.gray
    )};
    color:${colors.heading};
    width:100%;
    font-size:18px;
    margin-top:50px;
    padding:10px;
    text-align:center;
`

const ButtonView = styled.View`
    margin-top: 40px;
    width:100%;
    padding:24px;
`