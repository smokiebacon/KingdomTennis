import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Touchable, TouchableOpacity, View } from 'react-native'
import { Text, Avatar, ActivityIndicator } from 'react-native-paper'
import { GlobalStyles } from "../constants/styles";
import { deleteCourtLocation, deletePlayer, getCourts, getPlayers, updateFavourite } from "../util/http";
import Button from "../UI/Button";
import CustomText from "../components/common/Text";
import CustomIcon from "../components/common/Icon";
import { useColorTheme } from "../constants/theme";
import { useEventForm } from "../store/eventForm-context";
import { EventsContext } from "../store/events-context";

const AllCourts = ({ navigation }) => {
    // const [courts, setCourts] = useState([]);
    // const eventFormCtx = useEventForm()
    // console.log("🚀 ~ AllCourts ~ courts:", courts)
    const [loading, setLoading] = useState(false);
    const { colors } = useColorTheme()
    const eventsForm = useEventForm();
    // const courts = 
    const eventsCtx = useContext(EventsContext);
    const courts = eventsCtx?.courts || [];
    const fetchPlayerData = async () => {
        setLoading(true);
        await  eventsCtx.getAllCourts()
        
        setLoading(false);
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AddCourtForm')
                }}>
                    <Text style={{ color: '#fff' }}>Add New Court</Text>
                </TouchableOpacity>
            )
        })
    }, [])
    const toggleFavourite = async (item) => {
        await updateFavourite(item.id, !item.is_favourite);
        // eventsCtx.getAllCourts()
        fetchPlayerData();
    }
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                eventsForm.changeValue('court', item);
                navigation.goBack();
            }} style={[styles.courtItem, { backgroundColor: item.id === eventsForm?.formValue?.court?.id ? colors.primary:  colors.card, }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, }}>
                    <Text style={{ color: GlobalStyles.colors.primary50 }} variant="titleMedium">{item.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, }}>
                    <Button style={{ marginRight: 10 }} onPress={async () => {
                        console.log(item, "line 42")
                        await deleteCourtLocation(item.id);
                        // eventsCtx.getAllCourts();
                        fetchPlayerData();
                    }}
                    >Remove</Button>
                    <TouchableOpacity
            onPress={() => toggleFavourite(item)}
             style={styles.isFavourite}>
                <CustomIcon Iconname='AntDesign' size={25} name={item.is_favourite ? 'heart' : 'hearto'} color={colors.primary} />
            </TouchableOpacity>
                    
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={[styles.container, { backgroundColor:colors.background  }]}>
            <FlatList
                data={courts}
                renderItem={renderItem}
                refreshControl={<RefreshControl
                    onRefresh={eventsCtx.getAllCourts}
                    refreshing={loading}
                    tintColor={GlobalStyles.colors.primary100}
                />}
            />

        </View>
    )
}


const styles = StyleSheet.create({
        container : {
            flex: 1,
            paddingTop: 20,
        },
        courtItem : { paddingVertical: 15,  marginVertical: 5, marginHorizontal: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
        isFavourite: { flexDirection: 'row', gap : 10, alignItems: 'center', marginVertical: 5, marginRight: 20, }
})

export default AllCourts;