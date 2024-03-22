import React, { FC } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { BaseStyle } from "../../constants/styles";
import CustomText from "../common/Text";
import { useColorTheme } from "../../constants/theme";
type SelectCategoryProps  = {
    label? : string;
    onPress : () => void;
    selected?: boolean;
}
export const SelectCategory:FC<SelectCategoryProps> = ({ label, onPress = () => {},selected}) => {
    console.log('selected', selected);
    const { colors } = useColorTheme();
    return (
        <TouchableOpacity style={[BaseStyle.textInput, {  backgroundColor: selected? colors.primary: colors.card, }, styles.item]} onPress={onPress}>
            <CustomText variant={"titleMedium"}>{label}</CustomText>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    item : {
        height: 55, 
        width: Dimensions.get('screen').width / 2.5,
        marginRight: 20,
        marginTop: 20,
        justifyContent: 'center'
    }
})