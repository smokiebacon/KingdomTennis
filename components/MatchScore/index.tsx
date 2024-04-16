import React from "react";
import { StyleSheet, View, } from 'react-native'
// import RNText from '../common/Text';
// import { useEventForm } from "../../store/eventForm-context";
import MatchScoreSet from "./MatchScoreSet";

const MatchScore = () => {
    // const eventFormCtx = useEventForm();

    // console.log("event form ctx", eventFormCtx.formValue.matchScore);
    
    return (
        <View style={styles.container}>
            <MatchScoreSet />
            {/* <RNText>Owais Anwar</RNText> */}
        </View>
    )
}
export default MatchScore;
const styles = StyleSheet.create({
    container : {
        marginVertical: 10,
    }
})