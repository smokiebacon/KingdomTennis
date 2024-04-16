import React from "react";
import { FlatList, ScrollView, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import RNText from '../common/Text';
import { useEventForm } from "../../store/eventForm-context";
import { useColorTheme } from "../../constants/theme";
import Button from "../../UI/Button";
import CustomIcon from "../common/Icon";
const MatchScoreSet = () => {
    const eventFormCtx = useEventForm();
    const arr = eventFormCtx.formValue.match_score;
    const { colors } = useColorTheme()
    const renderItem = ({ item, index }) => {
        console.log("item.myTeam", item?.myTeam)
        return (
            <View>
                <RNText style={{ width: 40,textAlign: 'center', margin: 6, }}> Set {index + 1}</RNText>
                <TextInput onChangeText={(text) => {
                    console.log("text", text)
                    const number = Number(text) || '';
                    const newArr = [...arr].map((nItem, nIndex) => {
                        if (index === nIndex) {
                            console.log("hereeeee",number)
                            return {
                                myTeam: text,
                                opponent: nItem.opponent,
                            }
                        } else {
                            return nItem;
                        }
                    });
                    eventFormCtx.changeValue("match_score", newArr);

                }} keyboardType="number-pad" value={String(item?.myTeam)}  style={[styles.setInputBox, { backgroundColor: colors.card, color: colors.text }]} />
                <TextInput 
                onChangeText={(text) => {
                    console.log("text", text)
                    const number = Number(text) || '';
                    const newArr = [...arr].map((nItem, nIndex) => {
                        if (index === nIndex) {
                            console.log("hereeeee",number)
                            return {
                                opponent: text,
                                myTeam: nItem.myTeam,
                            }
                        } else {
                            return nItem;
                        }
                    });
                    eventFormCtx.changeValue("match_score", newArr);
                }}
                keyboardType="number-pad" value={String(item.opponent)} maxLength={1} style={[styles.setInputBox, { backgroundColor: colors.card, color: colors.text, }]} />
                {
                    index > 0 ?
                    <TouchableOpacity onPress={() => {
                        const newArr = [...eventFormCtx.formValue.match_score].filter((rItem, rIndex) => rIndex !== index);
                        eventFormCtx.changeValue("match_score", newArr);
                    }} style={[styles.setInputBox, { justifyContent: 'center', alignItems: 'center', height: 20, }]}>
                        <CustomIcon Iconname="AntDesign" name={"close"} size={20} color={colors.text} />
                    </TouchableOpacity>
                    : null
                }
            </View>
        )
    }
    return (
        <>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <RNText variant="titleLarge">Score</RNText>
            <View>
                <Button onPress={eventFormCtx.addNewSet}>Add New Set</Button>
            </View>
        </View>
            <View style={styles.container}>
                <View>
                    <View style={{ height: 30, }}>

                    </View>
                    <View style={styles.setTitle}>
                        <RNText variant="titleMedium">My Team</RNText>
                    </View>
                    <View style={styles.setTitle}>
                        <RNText style={{}} variant="titleMedium">Opponent</RNText>
                    </View>
                </View>
                <View style={{ marginLeft: 10, }}>
                    <FlatList
                        data={arr}
                        horizontal
                        renderItem={renderItem}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    setTitle: {
        height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 6,
    },
    setInputBox: { height: 50, width: 50, textAlign: 'center', margin: 6 }
});
export default MatchScoreSet;