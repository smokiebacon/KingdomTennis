import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, RefreshControl, Touchable, TouchableOpacity, View }  from 'react-native'
import { Text, Avatar, ActivityIndicator } from 'react-native-paper'
import { GlobalStyles } from "../constants/styles";
import { deletePlayer, getPlayers } from "../util/http";
import Button from "../UI/Button";

const SelectPlayer = ({ navigation }) => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log("🚀 ~ SelectPlayer ~ players:", players)
    const fetchPlayerData = async () => {
        setLoading(true);
        const data = await getPlayers();
        setPlayers(data);
        setLoading(false);
    }
    useEffect(() => {
        const subscribe = navigation.addListener('focus', () => {
            fetchPlayerData();
        })
        return () => subscribe;
    },[])   
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight : () => (
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AddPlayerForm')
                }}>
                    <Text style={{ color: '#fff' }}>Add Player</Text>
                </TouchableOpacity>
            )
        })
    },[])
    
    const renderItem = ({ item }) => {
        return (
            <View style={{ paddingVertical: 15, backgroundColor: 'rgb(36,36,36)', marginVertical: 5, marginHorizontal: 10, borderRadius: 8, flexDirection: 'row' , alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' , alignItems: 'center',  }}>
                    <Avatar.Text style={{ marginHorizontal: 20, }} size={35} label={item.name[0]} />
                    <Text style={{ color: GlobalStyles.colors.primary50 }} variant="titleMedium">{item.name}</Text>
                </View>
                <Button style={{ marginRight: 20}} onPress={async () => {
                    console.log(item, "line 42")
                    await deletePlayer(item.id);
                    fetchPlayerData();
                }}
                >Remove</Button>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.colors.gray500 }}>
            <FlatList
            data={players}
            renderItem={renderItem}
            refreshControl={<RefreshControl 
                onRefresh={fetchPlayerData}
                refreshing={loading}
                tintColor={GlobalStyles.colors.primary100}
            />}
            />
            
        </View>
    )
}


export default SelectPlayer;