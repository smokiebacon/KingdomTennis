import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import CustomText from '../common/Text';
import { BaseColor } from '../../constants/styles';
import { useColorTheme } from '../../constants/theme';
import CustomIcon from '../common/Icon';


type ShowPlayerProps= {
    playerName : string;
    onPressAddPlayer? : () => void;
}
const ShowPlayer:FC<ShowPlayerProps> = ({playerName,onPressAddPlayer}) => {
    console.log('playerName', playerName);
    const { colors } = useColorTheme()
    return (
        <>
        {playerName ?
<View style={[style.teamPlayer]}>
              <Avatar.Text size={40} label={playerName[0]} style={{ backgroundColor: BaseColor.orangeColor }} ></Avatar.Text>
              <CustomText variant={"titleMedium"}>{playerName}</CustomText>
            </View>
            : 
            <View style={[style.teamPlayer]}>
                <TouchableOpacity onPress={onPressAddPlayer} style={[style.addPlayerIcon,{backgroundColor: colors.card,}]}>
                <CustomIcon Iconname='AntDesign' name={"plus"} size={30}  color={colors.text}/>
                </TouchableOpacity>
                <CustomText variant={"titleMedium"} >Add Player</CustomText>
            </View>
}
        </>
    )

};


const style = StyleSheet.create({
    teamPlayer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 8, },
    addPlayerIcon: { width: 46, height: 46,  borderRadius: 23,  justifyContent: 'center', alignItems : 'center'}
})
export default ShowPlayer;