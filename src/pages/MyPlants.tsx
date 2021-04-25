import React, { useEffect, useState } from 'react';
import { Alert , FlatList} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import styled from 'styled-components/native';

import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

import { formatDistance, isBefore } from 'date-fns';
import { pt } from 'date-fns/locale';

import Waterdrop from '../assets/waterdrop.png';
import { loadPlant, PlantProps, removePlant} from '../libs/storage';
import { NoResultsAnimation } from '../components/NoResultsAnimation';

export function MyPlants(){
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();
    const [noResults, setNoResults] = useState(true);

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
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não 😰',
                style: 'cancel'
            },
            {
                text: 'Sim 😉',
                onPress: async () =>{
                    try {
                        await removePlant(plant.id)

                        setMyPlants((oldData) =>
                            oldData.filter((item) => item.id !== plant.id)
                        );

                    } catch (error) {
                        Alert.alert('Não foi possível remover! 😥')
                    }
                }
            }
        ])
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
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    }
                </Plants>
            </MainContent>
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