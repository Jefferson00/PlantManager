import React, { useEffect, useState } from 'react';
import { Alert , FlatList, Modal, View} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import styled from 'styled-components/native';

import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

import { formatDistance, isBefore } from 'date-fns';
import { pt } from 'date-fns/locale';
import {SvgFromUri, Text} from 'react-native-svg'

import Waterdrop from '../assets/waterdrop.png';
import { loadPlant, PlantProps, removePlant} from '../libs/storage';
import { NoResultsAnimation } from '../components/NoResultsAnimation';
import { useNavigation } from '@react-navigation/core';

export function MyPlants(){
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [selectedPlant, setSelectedPlant] = useState<PlantProps | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();
    const [noResults, setNoResults] = useState(true);
    const navigation = useNavigation();

    useEffect(() =>{
        async function loadStorageData(){
            const plantsStoraged = await loadPlant();

            if(JSON.stringify(plantsStoraged) === '[]') return  setLoading(false);

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            );

            setNextWatered(
                `Regue sua ${plantsStoraged[0].name} daqui a ${nextTime}`
            )

            setMyPlants(plantsStoraged);
            setNoResults(false);
            setLoading(false);
        }

        loadStorageData();
       
    },[])

    useEffect(()=>{
        setTimeout(()=>{
            if(JSON.stringify(myPlants) !== '[]'){
                const nextTime = formatDistance(
                    new Date(myPlants[0].dateTimeNotification).getTime(),
                    new Date().getTime(),
                    {locale: pt}
                );
    
                setNextWatered(
                    `Regue sua ${myPlants[0].name} daqui a ${nextTime}`
                )
            }
        },60000)
    },[myPlants, nextWatered])

    useEffect(()=>{
        if(JSON.stringify(myPlants) === '[]') return  setNoResults(true);
    },[myPlants])

    function handleRemove(plant: PlantProps){
        setSelectedPlant(plant);
        setModalVisible(true);
    }

    function handleCancel(){
        setModalVisible(false);
        setSelectedPlant(null);
    }

    async function handleDeletePlant(){
        if(selectedPlant){
            try {
                await removePlant(selectedPlant.id)

                setMyPlants((oldData) =>
                    oldData.filter((item) => item.id !== selectedPlant.id)
                );
                setModalVisible(false);
                setSelectedPlant(null);

            } catch (error) {
                Alert.alert('Não foi possível remover! 😥')
            }
        }
    }

    async function handleUpdate(plant: PlantProps) {
        navigation.navigate('PlantSave', {plant, isUpdate:true});
    }

    if (loading) return <Load/>

    return(
        <MainContainer>
                <Header screen="MyPlants"/>
            <MainContent>
                {!noResults &&
                    <Spotlight>
                        <SpotlightImage source={Waterdrop}/>
                        <SpotlightText>
                            {nextWatered}
                        </SpotlightText>
                    </Spotlight>
                }

                <Plants>
                    <PlantsTitle>
                        {noResults ? 'Nenhuma plantinha cadastrada ainda 🙁' : ' Próximas regadas'}
                    </PlantsTitle>

                    {noResults ?
                        <NoResultsAnimation/>
                        :
                        <FlatList 
                            data={myPlants}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({item}) => (
                                <PlantCardSecondary 
                                    data={item}
                                    handleRemove={() => {handleRemove(item)}}
                                    handleUpdate={() => {handleUpdate(item)}}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    }
                </Plants>
            </MainContent>
            
            {/*MODAL CONTENT*/}
            {selectedPlant &&
                <Modal
                    animationType="fade"
                    visible={modalVisible}
                    transparent
                    statusBarTranslucent
                >
                    
                    <ModalContainer>
                        <ModalContent>
                            <ModalImage>
                                <SvgFromUri 
                                uri={selectedPlant.photo}
                                width={70}
                                height={70}
                                />
                            </ModalImage>

                            <ModalTextView>
                                <ModalText>
                                    Deseja mesmo deletar sua
                                </ModalText>
                                <View style={{flexDirection:'row'}}>
                                    <ModalText style={{fontFamily:fonts.heading}}>
                                        {selectedPlant.name}
                                    </ModalText>
                                    <ModalText >
                                        ?
                                    </ModalText>
                                </View>
                            </ModalTextView>

                            <ButtonsView>
                                <ModalButton onPress={handleCancel}>
                                    <ModalCancelText>
                                        Cancelar
                                    </ModalCancelText>
                                </ModalButton>

                                <ModalButton 
                                    style={{marginLeft:8}}
                                    onPress={handleDeletePlant}
                                >
                                    <ModalDeleteText>
                                        Deletar
                                    </ModalDeleteText>
                                </ModalButton>
                            </ButtonsView>
                        </ModalContent>
                    </ModalContainer>
                    
                </Modal>
            }
        </MainContainer>
    )
}

const MainContainer = styled.View`
    flex:1;
    background-color: ${colors.background};
`
const MainContent = styled.View`
    flex:1;
    padding: 0 32px;
    align-items:center;
    justify-content:space-between;
`

const Spotlight = styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    background-color:${colors.blue_light};
    padding:20px;
    border-radius:20px;
`
const SpotlightImage = styled.Image`
    width: 56px;
    height: 56px;
`
const SpotlightText = styled.Text`
    flex:1;
    text-align:justify;
    font-family:${fonts.text};
    color:${colors.blue};
    font-size:17px;
    margin-left:20px;
`

const Plants = styled.View`
    flex:1;
    width:100%;
    margin-top:41px;
`
const PlantsTitle = styled.Text`
    font-size:24px;
    font-family:${fonts.heading};
    color:${colors.heading};
`

const ModalContent = styled.View`
    justify-content:center;
    height:322px;
    width:80%;
    margin: 0 auto;
    border-radius:20px;
    align-items:center;
    background-color:${colors.white};
`

const ModalContainer = styled.View`
    background-color:rgba(0,0,0,0.5);
    flex:1;
    justify-content:center;
    align-items:center;
`

const ModalTextView = styled.View`
    margin-top:16px;
    align-items:center;
`

const ModalText = styled.Text`
    font-size:17px;
    line-height:25px;
    font-family:${fonts.text};
    color:${colors.heading};
`

const ModalImage = styled.View`
    width: 120px;
    height: 120px;
    background-color:${colors.shape};
    border-radius:20px;
    align-items:center;
    justify-content:center;
`
const ModalButton = styled.TouchableOpacity`
    background-color:${colors.shape};
    height:48px;
    padding: 0 10px;
    align-items:center;
    justify-content:center;
    border-radius:10px;
    min-width:96px;
`
const ButtonsView = styled.View`
    flex-direction:row;
    width:100%;
    justify-content:center;
    margin-top:24px;
`

const ModalDeleteText = styled.Text`
    font-size:15px;
    line-height:23px;
    font-family:${fonts.text};
    color:${colors.red};
`

const ModalCancelText = styled.Text`
    font-size:15px;
    line-height:23px;
    font-family:${fonts.text};
    color:${colors.heading};
`