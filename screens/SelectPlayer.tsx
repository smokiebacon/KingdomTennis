import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, RefreshControl, Touchable, TouchableOpacity, View }  from 'react-native'
import { Text, Avatar, ActivityIndicator } from 'react-native-paper'
import { GlobalStyles } from "../constants/styles";
import { deletePlayer, getPlayers } from "../util/http";
import Button from "../UI/Button";
import { useColorTheme } from "../constants/theme";
import CustomTextInput from "../components/ManageEvent/TextInput";
import CustomIcon from "../components/common/Icon";

const SelectPlayer = ({ navigation }) => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('')
    const { colors }   = useColorTheme()
    console.log("🚀 ~ SelectPlayer ~ players:", players)
    const fetchPlayerData = async () => {
        setLoading(true);
        const data = await getPlayers();
        setPlayers(data);
        setLoading(false);
    }

    const [filteredPlayers, setFilteredPlayers] = useState([]);


    useEffect(() => {
        setFilteredPlayers(players);
    },[players])


    useEffect(() => {
        let arr = [...players];
        if(searchTerm.length) {
            arr = arr.filter((player) => player.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
            console.log(arr, "arrrrrrr");   
            setFilteredPlayers(arr);
        } 
        setFilteredPlayers(arr);
    },[searchTerm])
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
            <View style={{ paddingVertical: 15, marginHorizontal: 10, flexDirection: 'row' , alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' , alignItems: 'center',  }}>
                    <Avatar.Text style={{ marginHorizontal: 10, }} size={35} label={item.name[0]} />
                    <Text style={{ color: GlobalStyles.colors.primary50 }} variant="titleMedium">{item.name}</Text>
                </View>
                {/* <Button style={{ marginRight: 20}} onPress={async () => {
                    console.log(item, "line 42")
                    await deletePlayer(item.id);
                    fetchPlayerData();
                }}
                >Remove</Button> */}
            </View>
        )
    }
    return (
        
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ paddingHorizontal:10, }}>
            <CustomTextInput
            style={{
                height: 60,
            }}
        // label={"Duration"}

        iconLeft={
            <CustomIcon Iconname="Feather" name="search" size={25} color={colors.text} style={{ marginRight: 10, }}/>
        }
        value={searchTerm}
        placeholder="Search Name"
        onChangeText={(text)=> { setSearchTerm(text) }}
        // value={}
        selectionColor={colors.primary}
      />
            </View>
            <FlatList
            data={filteredPlayers}
            renderItem={renderItem}
            refreshControl={<RefreshControl 
                onRefresh={fetchPlayerData}
                refreshing={loading}
                tintColor={GlobalStyles.colors.primary100}
            />}
            ItemSeparatorComponent={() => <View style={{ backgroundColor: colors.border, height: 1, width: '100%' }} />}
            />
            
        </View>
    )
}


export default SelectPlayer;