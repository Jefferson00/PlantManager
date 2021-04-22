import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import api from '../services/api';
import { FlatList } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import styled from 'styled-components/native';

import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import {Load} from '../components/Load';

interface EnviromentProps{
    key: string;
    title: string;
}

interface PlantsProps{
    id:number;
    name:string;
    about:string;
    water_tips:string;
    photo:string;
    environments:[string];
    frequency:{
        times:number;
        repeat_every:string;
    }
}

export function PlantSelect() {
    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantsProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);

    useEffect(()=>{
        async function fetchEnviroment(){
            const {data} = await api
            .get('plants_environments?_sort=title&_order=asc');
            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ...data
            ]);
        }

        fetchEnviroment();
    },[])

    useEffect(()=>{
        fecthPlants();
    },[])

    async function fecthPlants(){
        const {data} = await api
        .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
        
        if(!data) return setLoading(false);

        if (page > 1){
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        }else{
            setPlants(data);
            setFilteredPlants(data);
        }

        
        setLoading(false);
        setLoadingMore(false);
    }

    function  handleEnviromentSelected(key:string){
        setEnviromentSelected(key);

        if(key === 'all') return setFilteredPlants(plants);

        const filtered = plants.filter(plant=>
            plant.environments.includes(key)    
        );

        setFilteredPlants(filtered);
    }

    function handleFetchMore(distance: number){
        if (distance < 1) return;

        setLoadingMore(true);
        setPage(oldValue => oldValue +1);
        fecthPlants();
    }

    if (loading) return <Load/>

    return(
        <MainContainer>
            <Header/>
            <Title>
                Em qual ambiente
            </Title>
            <Subtitle>
                você quer colocar sua planta?
            </Subtitle>

            <View>
                <FlatList
                    data={enviroments}
                    renderItem={({item}) =>(
                        <EnviromentButton 
                            title={item.title} 
                            key={item.key}
                            active={item.key === enviromentSelected}
                            onPress={()=> handleEnviromentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        height:40,
                        justifyContent:'center',
                        paddingBottom:5,
                        marginLeft:32,
                        marginVertical:32,
                    }}
                />
            </View>

            <PlantsView>
                <FlatList
                    data={filteredPlants}
                    renderItem={({item}) => (
                        <PlantCardPrimary data={item} key={item.id}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd}) => 
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore ? <ActivityIndicator color={colors.green}/> : <></>
                    }
                />
            </PlantsView>
           

           
        </MainContainer>
    )
}

const MainContainer = styled.View`
    flex:1;
    background-color:${colors.background};
`

const Title = styled.Text`
    font-size:17px;
    font-family:${fonts.heading};
    margin-left:33px;
    margin-top:20px;
    color:${colors.heading};
    line-height:20px;
`

const Subtitle = styled.Text`
    font-size:17px;
    font-family:${fonts.text};
    margin-left:33px;
    color:${colors.heading};
`

const PlantsView = styled.View`
    flex:1;
    justify-content:center;
    padding: 0 32px;
`
