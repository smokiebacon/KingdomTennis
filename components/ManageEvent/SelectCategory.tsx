import React, { FC } from "react";
import { Dimensions, TouchableOpacity } from 'react-native'
import { BaseStyle } from "../../constants/styles";
import CustomText from "../common/Text";
import { useColorTheme } from "../../constants/theme";
type SelectCategoryProps  = {
    label? : string;
    onPress : () => void
}
export const SelectCategory:FC<SelectCategoryProps> = ({ label, onPress = () => {}}) => {
    const { colors } = useColorTheme();
    return (
        <TouchableOpacity style={[BaseStyle.textInput, { height: 55, width: Dimensions.get('screen').width / 2.5, backgroundColor: colors.card, marginRight: 20, marginTop: 20}]} onPress={onPress}>
            <CustomText variant={"titleMedium"}>{label}</CustomText>
        </TouchableOpacity>
    )
}