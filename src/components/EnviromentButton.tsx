import React from 'react';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import {RectButton, RectButtonProps} from 'react-native-gesture-handler'
import { StyleSheet, Text } from 'react-native';

interface EnviromentButtonProps extends RectButtonProps{
    title:string;
    active?:boolean;
}

export function EnviromentButton({title, active = false, ...rest} :EnviromentButtonProps) {

    return(
        <RectButton
            style={[styles.button, active && styles.buttonActive]}
            {...rest}
        
        >
            <Text style={[styles.title, active && styles.titleActive]}>
                {title}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:colors.shape,
        height:40,
        width:76,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12,
        marginRight:5,
    },
    buttonActive:{
        backgroundColor:colors.green_light,
    },
    title:{
        color: colors.heading,
        fontFamily: fonts.text,
    },
    titleActive:{
        fontFamily: fonts.heading,
        color:colors.green_dark,
    }
})
