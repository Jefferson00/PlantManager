import React, { useEffect, useState } from 'react';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import styled from 'styled-components/native';

import { Header } from '../components/Header';

import Waterdrop from '../assets/waterdrop.png';
import { FlatList } from 'react-native-gesture-handler';
import { loadPlant, PlantProps } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

export function MyPlants(){
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    useEffect(() =>{
        async function loadStorageData(){
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            );

            setNextWatered(
                `Regue sua ${plantsStoraged[0].name} daqui a ${nextTime} horas`
            )

            setMyPlants(plantsStoraged);
            setLoading(false);
        }

        loadStorageData();
    },[])

    return(
        <MainContainer>
            <Header/>
            <MainContent>
                <Spotlight>
                    <SpotlightImage source={Waterdrop}/>
                    <SpotlightText>
                        {nextWatered}
                    </SpotlightText>
                </Spotlight>

                <Plants>
                    <PlantsTitle>
                        Próximas regadas
                    </PlantsTitle>

                    <FlatList 
                        data={myPlants}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({item}) => (
                            <PlantCardSecondary data={item}/>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
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