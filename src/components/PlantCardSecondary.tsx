import React from 'react';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Animated, StyleSheet, Text, View } from 'react-native';
import {SvgFromUri} from 'react-native-svg'
import { Feather } from '@expo/vector-icons';

interface PlantProps extends RectButtonProps{
    data:{
        name:string,
        photo:string,
        hour:string,
    };
    handleRemove: () => void;
    handleUpdate: () => void;
}

export function PlantCardSecondary({ data, handleRemove, handleUpdate, ...rest} :PlantProps) {

    return(
        <Swipeable
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather name="trash" size={32} color={colors.white}/>
                        </RectButton>
                    </View>
                </Animated.View>
            )}
            renderLeftActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.buttonEdit}
                            onPress={handleUpdate}
                        >
                            <Feather name="edit-2" size={32} color={colors.white}/>
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
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
        </Swipeable>
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
    buttonRemove:{
        width:100,
        height:85,
        backgroundColor:colors.red,
        marginTop:15,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
        right:25,
        paddingLeft:15,
    },
    buttonEdit:{
        width:100,
        height:85,
        backgroundColor: colors.blue,
        marginTop:15,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
        left:25,
        paddingRight:15,
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
