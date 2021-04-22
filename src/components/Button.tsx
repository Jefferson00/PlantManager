import React from 'react';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import styled from 'styled-components/native';
import { TouchableOpacityProps, TouchableOpacity, StyleSheet } from 'react-native';

interface ButtonProps extends TouchableOpacityProps{
    title:string;
}

export function Button({title, ...rest}:ButtonProps) {
    return(
        <TouchableOpacity 
            style={styles.buttonContainer}
            {...rest}
        >
           <ButtonText>
               {title}
            </ButtonText> 
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor:colors.green,
        height:56,
        borderRadius:16,
        justifyContent:'center',
        alignItems:'center'
    }
})

const ButtonText = styled.Text`
    font-size:16px;
    color:${colors.white};
    font-family:${fonts.heading};
`