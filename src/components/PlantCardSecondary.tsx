import React from 'react';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import {RectButton, RectButtonProps} from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native';
import {SvgFromUri} from 'react-native-svg'

interface PlantProps extends RectButtonProps{
    data:{
        name:string,
        photo:string,
        hour:string,
    }
}

export function PlantCardSecondary({ data, ...rest} :PlantProps) {

    return(
        <RectButton
            style={styles.button}
            {...rest}
        
        >
            <SvgFromUri 
                uri={data.photo}
                width={50}
                height={50}
            />
            <Text style={styles.title}>
                {data.name}
            </Text>

            <View style={styles.details}>
                 <Text style={styles.timeLabel}>
                     Regar às
                 </Text>
                 <Text style={styles.time}>
                     {data.hour}
                 </Text>
            </View>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    button:{
        width:'100%',
        backgroundColor:colors.shape,
        borderRadius:20,
        paddingVertical:25,
        paddingHorizontal:20,
        alignItems:'center',
        marginVertical:5,
        flexDirection:'row',
    },
    title:{
        flex:1,
        fontSize:17,
        color: colors.green_dark,
        fontFamily: fonts.heading,
        marginLeft:10,
    },
    details:{
        alignItems:'flex-end',
    },
    timeLabel:{
        fontSize:16,
        fontFamily: fonts.text,
        color:colors.body_light,
    },
    time:{
        fontSize:16,
        marginTop:5,
        fontFamily:fonts.heading,
        color: colors.body_dark,
    }
})
